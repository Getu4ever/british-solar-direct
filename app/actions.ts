'use server';

import { prisma } from './lib/prisma';
import {
  sendQuoteNotification,
  sendContactNotification,
  sendTradeApplicationNotification,
} from './lib/email-service';
import { isAdminAuthenticated } from './lib/admin-auth';

export async function submitQuoteRequest(formData: FormData) {
  const companyName = (formData.get('companyName') as string)?.trim();
  const contactEmail = (formData.get('contactEmail') as string)?.trim().toLowerCase();
  const productInterest = (formData.get('productInterest') as string)?.trim() || null;
  const quantity = (formData.get('quantity') as string)?.trim() || null;
  const projectNotes = (formData.get('projectNotes') as string)?.trim() || null;

  if (!companyName || !contactEmail) {
    return { success: false, error: 'Please provide both company name and email.' };
  }

  try {
    await prisma.quoteRequest.create({
      data: { companyName, contactEmail, productInterest, quantity, projectNotes },
    });

    try {
      await sendQuoteNotification({
        companyName,
        contactEmail,
        productInterest,
        quantity,
        projectNotes,
      });
    } catch (emailError) {
      console.error('Quote saved but email notification failed:', emailError);
    }

    return { success: true };
  } catch (error) {
    console.error('Quote submission error:', error);
    return { success: false, error: 'Failed to submit your request. Please try again.' };
  }
}

export async function submitContactEnquiry(formData: FormData) {
  const name = (formData.get('name') as string)?.trim();
  const companyName = (formData.get('companyName') as string)?.trim() || null;
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const message = (formData.get('message') as string)?.trim();

  if (!name || !email || !message) {
    return { success: false, error: 'Please fill in all required fields.' };
  }

  try {
    await prisma.contactEnquiry.create({
      data: { name, companyName, email, message },
    });

    try {
      await sendContactNotification({ name, companyName, email, message });
    } catch (emailError) {
      console.error('Enquiry saved but email notification failed:', emailError);
    }

    return { success: true };
  } catch (error) {
    console.error('Contact submission error:', error);
    return { success: false, error: 'Failed to send your enquiry. Please try again.' };
  }
}

export async function submitTradeApplication(formData: FormData) {
  const companyName = (formData.get('companyName') as string)?.trim();
  const contactName = (formData.get('contactName') as string)?.trim();
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const phone = (formData.get('phone') as string)?.trim() || null;
  const businessType = (formData.get('businessType') as string)?.trim();
  const notes = (formData.get('notes') as string)?.trim() || null;

  if (!companyName || !contactName || !email || !businessType) {
    return { success: false, error: 'Please fill in all required fields.' };
  }

  try {
    await prisma.tradeApplication.create({
      data: { companyName, contactName, email, phone, businessType, notes },
    });

    try {
      await sendTradeApplicationNotification({
        companyName,
        contactName,
        email,
        phone,
        businessType,
        notes,
      });
    } catch (emailError) {
      console.error('Application saved but email notification failed:', emailError);
    }

    return { success: true };
  } catch (error) {
    console.error('Trade application error:', error);
    return { success: false, error: 'Failed to submit your application. Please try again.' };
  }
}

export async function getWholesaleLeads() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return { success: false, data: [], error: 'Unauthorized' };
  }

  try {
    const leads = await prisma.quoteRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      data: leads.map((lead) => ({
        id: lead.id,
        company: lead.companyName,
        email: lead.contactEmail,
        productInterest: lead.productInterest,
        quantity: lead.quantity,
        date: lead.createdAt.toLocaleString('en-GB'),
      })),
    };
  } catch (error) {
    console.error('Failed to fetch leads:', error);
    return { success: false, data: [] };
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
