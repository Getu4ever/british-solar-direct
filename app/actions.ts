'use server';

import {
  sendQuoteNotification,
  sendContactNotification,
} from './lib/email-service';
import { isAdminAuthenticated } from './lib/admin-auth';
import {
  createQuoteLead,
  createContactLead,
  getDashboardLeads,
  getQuoteLeadById,
  updateQuoteLead,
  updateQuoteProject as persistQuoteProject,
  deleteQuoteLead,
  updateContactLead,
  deleteContactLead,
  type QuoteProjectPatch,
} from './lib/leads-store';
import {
  computeCompletedPaidMetrics,
  isPipelineStatus,
  normalizePipelineStatus,
  type PipelineStatus,
} from './lib/project-finance';

export async function submitQuoteRequest(formData: FormData) {
  const customerName = (formData.get('customerName') as string)?.trim();
  const contactEmail = (formData.get('contactEmail') as string)?.trim().toLowerCase();
  const contactPhone = (formData.get('contactPhone') as string)?.trim();
  const deliveryPostcode = (formData.get('deliveryPostcode') as string)?.trim().toUpperCase() || null;
  const productInterest = (formData.get('productInterest') as string)?.trim() || null;
  const quantity =
    (formData.get('quantity') as string)?.trim() || '1 full turnkey installation package';
  const projectNotes = (formData.get('projectNotes') as string)?.trim() || null;
  const needsInstallation = formData.get('needsInstallation') === 'yes';
  const propertyImages = formData
    .getAll('propertyImages')
    .filter((file): file is File => file instanceof File && file.size > 0);

  if (propertyImages.length > 4) {
    return {
      success: false,
      error: 'Please upload up to 4 images per quote request.',
    };
  }

  for (const image of propertyImages) {
    if (!image.type.startsWith('image/')) {
      return {
        success: false,
        error: 'Only image files are allowed for property uploads.',
      };
    }

    if (image.size > 2 * 1024 * 1024) {
      return {
        success: false,
        error: 'Each image must be 2MB or smaller.',
      };
    }
  }

  if (!customerName || !contactEmail || !contactPhone) {
    return {
      success: false,
      error: 'Please provide your name, email, and phone number.',
    };
  }

  const notesWithInstall = needsInstallation
    ? `[Installation requested] ${projectNotes ?? ''}`.trim()
    : projectNotes;
  const imageSummary = propertyImages.length
    ? `Property images attached: ${propertyImages.map((image) => image.name).join(', ')}`
    : null;
  const notesWithUploads = [notesWithInstall, imageSummary].filter(Boolean).join('\n\n') || null;
  const uploadedImages = await Promise.all(
    propertyImages.map(async (image) => ({
      filename: image.name,
      type: image.type,
      content: Buffer.from(await image.arrayBuffer()),
    }))
  );
  const propertyImagesForStorage = uploadedImages.map((image) => ({
    filename: image.filename,
    type: image.type,
    dataUrl: `data:${image.type};base64,${image.content.toString('base64')}`,
  }));
  const propertyImagesJson = propertyImagesForStorage.length
    ? JSON.stringify(propertyImagesForStorage)
    : null;

  try {
    await createQuoteLead({
      customerName,
      contactEmail,
      contactPhone,
      deliveryPostcode,
      productInterest,
      quantity,
      projectNotes: notesWithUploads,
      propertyImages: propertyImagesJson,
    });
  } catch (dbError) {
    console.error('Quote request save failed; continuing with email delivery:', dbError);
  }

  try {
    await sendQuoteNotification({
      customerName,
      contactEmail,
      contactPhone,
      deliveryPostcode,
      productInterest,
      quantity,
      projectNotes: notesWithUploads,
      needsInstallation,
      uploadedImages,
    });
    return { success: true };
  } catch (emailError) {
    console.error('Quote submission email failed:', emailError);
    return { success: false, error: 'Failed to submit your request. Please try again.' };
  }
}

export async function submitContactEnquiry(formData: FormData) {
  const name = (formData.get('name') as string)?.trim();
  const propertyName = (formData.get('propertyName') as string)?.trim() || null;
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const message = (formData.get('message') as string)?.trim();

  if (!name || !email || !message) {
    return { success: false, error: 'Please fill in all required fields.' };
  }

  try {
    await createContactLead({ name, propertyName, email, message });
  } catch (dbError) {
    console.error('Contact enquiry save failed; continuing with email delivery:', dbError);
  }

  try {
    await sendContactNotification({ name, propertyName, email, message });
    return { success: true };
  } catch (emailError) {
    console.error('Contact submission email failed:', emailError);
    return { success: false, error: 'Failed to send your enquiry. Please try again.' };
  }
}

export async function getAdminDashboard() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const { quotes, contacts } = await getDashboardLeads();
    const metrics = computeCompletedPaidMetrics(quotes);

    return {
      success: true,
      data: {
        quotes: quotes.map((lead) => ({
          id: lead.id,
          customer: lead.customerName,
          email: lead.contactEmail,
          phone: lead.contactPhone,
          postcode: lead.deliveryPostcode,
          productInterest: lead.productInterest,
          quantity: lead.quantity,
          notes: lead.projectNotes,
          propertyImages: lead.propertyImages,
          status: normalizePipelineStatus(lead.status),
          agreedTotalPricePence: lead.agreedTotalPricePence,
          panelCostPence: lead.panelCostPence,
          batteryInverterCostPence: lead.batteryInverterCostPence,
          scaffoldingCostPence: lead.scaffoldingCostPence,
          contractorLaborCostPence: lead.contractorLaborCostPence,
          date: lead.createdAt.toLocaleString('en-GB'),
        })),
        contacts: contacts.map((item) => ({
          id: item.id,
          name: item.name,
          property: item.propertyName,
          email: item.email,
          message: item.message,
          date: item.createdAt.toLocaleString('en-GB'),
        })),
        metrics: {
          completedCount: metrics.completedCount,
          grossRevenuePence: metrics.grossRevenuePence,
          capitalReinvestedPence: metrics.capitalReinvestedPence,
          distributableProfitPence: metrics.distributableProfitPence,
          equityDrawdownPoolPence: metrics.equityDrawdownPoolPence,
        },
      },
    };
  } catch (error) {
    console.error('Failed to fetch admin dashboard:', error);
    return {
      success: true,
      warning: 'Dashboard loaded in fallback mode. Lead storage is currently unavailable on this deployment.',
      data: {
        quotes: [],
        contacts: [],
        metrics: {
          completedCount: 0,
          grossRevenuePence: 0,
          capitalReinvestedPence: 0,
          distributableProfitPence: 0,
          equityDrawdownPoolPence: 0,
        },
      },
    };
  }
}

export async function getQuoteProject(id: string) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return { success: false as const, error: 'Unauthorized' };
  }

  try {
    const lead = await getQuoteLeadById(id);
    if (!lead) {
      return { success: false as const, error: 'Quote project not found.' };
    }

    return {
      success: true as const,
      data: {
        ...lead,
        status: normalizePipelineStatus(lead.status),
        date: lead.createdAt.toLocaleString('en-GB'),
      },
    };
  } catch (error) {
    console.error('Quote project fetch error:', error);
    return { success: false as const, error: 'Failed to load quote project.' };
  }
}

export async function updateQuoteProject(
  id: string,
  patch: {
    status?: string;
    agreedTotalPricePence?: number | null;
    paymentTermsNotes?: string | null;
    panelsOrdered?: boolean;
    batteryInverterSecured?: boolean;
    scaffoldingBooked?: boolean;
    dnoFiled?: boolean;
    panelCostPence?: number | null;
    batteryInverterCostPence?: number | null;
    scaffoldingCostPence?: number | null;
    contractorLaborCostPence?: number | null;
  }
) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return { success: false as const, error: 'Unauthorized' };
  }

  const nextPatch: QuoteProjectPatch = {};

  if (patch.status !== undefined) {
    if (!isPipelineStatus(patch.status)) {
      return { success: false as const, error: 'Invalid pipeline status.' };
    }
    nextPatch.status = patch.status as PipelineStatus;
  }

  if (patch.agreedTotalPricePence !== undefined) {
    nextPatch.agreedTotalPricePence = patch.agreedTotalPricePence;
  }
  if (patch.paymentTermsNotes !== undefined) {
    nextPatch.paymentTermsNotes = patch.paymentTermsNotes?.trim() || null;
  }
  if (patch.panelsOrdered !== undefined) nextPatch.panelsOrdered = patch.panelsOrdered;
  if (patch.batteryInverterSecured !== undefined) {
    nextPatch.batteryInverterSecured = patch.batteryInverterSecured;
  }
  if (patch.scaffoldingBooked !== undefined) {
    nextPatch.scaffoldingBooked = patch.scaffoldingBooked;
  }
  if (patch.dnoFiled !== undefined) nextPatch.dnoFiled = patch.dnoFiled;
  if (patch.panelCostPence !== undefined) nextPatch.panelCostPence = patch.panelCostPence;
  if (patch.batteryInverterCostPence !== undefined) {
    nextPatch.batteryInverterCostPence = patch.batteryInverterCostPence;
  }
  if (patch.scaffoldingCostPence !== undefined) {
    nextPatch.scaffoldingCostPence = patch.scaffoldingCostPence;
  }
  if (patch.contractorLaborCostPence !== undefined) {
    nextPatch.contractorLaborCostPence = patch.contractorLaborCostPence;
  }

  try {
    const updated = await persistQuoteProject(id, nextPatch);
    if (!updated) {
      return { success: false as const, error: 'Quote project not found.' };
    }

    return {
      success: true as const,
      data: {
        ...updated,
        status: normalizePipelineStatus(updated.status),
        date: updated.createdAt.toLocaleString('en-GB'),
      },
    };
  } catch (error) {
    console.error('Quote project update error:', error);
    return { success: false as const, error: 'Failed to update quote project.' };
  }
}

export async function updateQuoteRequest(input: {
  id: string;
  customerName: string;
  contactEmail: string;
  deliveryPostcode: string;
  quantity: string;
  productInterest?: string;
  projectNotes?: string;
}) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return { success: false, error: 'Unauthorized' };
  }

  const customerName = input.customerName.trim();
  const contactEmail = input.contactEmail.trim().toLowerCase();
  const deliveryPostcode = input.deliveryPostcode.trim().toUpperCase();
  const quantity = input.quantity.trim();
  const productInterest = input.productInterest?.trim() || null;
  const projectNotes = input.projectNotes?.trim() || null;

  if (!customerName || !contactEmail || !deliveryPostcode || !quantity) {
    return { success: false, error: 'Please complete all required fields.' };
  }

  try {
    await updateQuoteLead({
      id: input.id,
      customerName,
      contactEmail,
      deliveryPostcode,
      quantity,
      productInterest,
      projectNotes,
    });

    return { success: true };
  } catch (error) {
    console.error('Quote update error:', error);
    return { success: false, error: 'Failed to update quote request.' };
  }
}

export async function deleteQuoteRequest(id: string) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    await deleteQuoteLead(id);
    return { success: true };
  } catch (error) {
    console.error('Quote delete error:', error);
    return { success: false, error: 'Failed to delete quote request.' };
  }
}

export async function updateContactEnquiry(input: {
  id: string;
  name: string;
  email: string;
  message: string;
}) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return { success: false, error: 'Unauthorized' };
  }

  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const message = input.message.trim();

  if (!name || !email || !message) {
    return { success: false, error: 'Please complete all required fields.' };
  }

  try {
    await updateContactLead({ id: input.id, name, email, message });
    return { success: true };
  } catch (error) {
    console.error('Contact update error:', error);
    return { success: false, error: 'Failed to update contact enquiry.' };
  }
}

export async function deleteContactEnquiry(id: string) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    await deleteContactLead(id);
    return { success: true };
  } catch (error) {
    console.error('Contact delete error:', error);
    return { success: false, error: 'Failed to delete contact enquiry.' };
  }
}

export async function adminLogin(password: string) {
  const { setAdminSession } = await import('./lib/admin-auth');

  if (!process.env.ADMIN_PASSWORD) {
    return { success: false, error: 'Admin access is not configured.' };
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return { success: false, error: 'Invalid password.' };
  }

  await setAdminSession();
  return { success: true };
}

export async function adminLogout() {
  const { clearAdminSession } = await import('./lib/admin-auth');
  await clearAdminSession();
  return { success: true };
}
