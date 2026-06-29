'use server'

// A secure, global memory cache that stays live while your local website is running
const globalInquiryCache = globalThis as unknown as {
  leads: Array<{ id: string; company: string; email: string; date: string }>;
};

if (!globalInquiryCache.leads) {
  globalInquiryCache.leads = [];
}

export async function submitQuoteRequest(formData: FormData) {
  const companyName = formData.get('companyName') as string;
  const contactEmail = formData.get('contactEmail') as string;

  // Validation safety guard
  if (!companyName || !contactEmail) {
    return { success: false, error: 'Please provide both fields.' };
  }

  try {
    const newLead = {
      id: Math.random().toString(36).substring(2, 9),
      company: companyName.trim(),
      email: contactEmail.trim().toLowerCase(),
      date: new Date().toLocaleString('en-GB'),
    };

    // Store the inquiry instantly inside your system cache array
    globalInquiryCache.leads.push(newLead);

    // Print your active dashboard metrics directly into your Cursor terminal log
    console.log('\n🌟 [SUCCESS] WHOLESALE INQUIRY CAPTURED SUCCESSFULLY!');
    console.log(`🏢 Company: ${newLead.company}`);
    console.log(`📧 Contact: ${newLead.email}`);
    console.log(`📈 Total Active Leads in Cache: ${globalInquiryCache.leads.length}\n`);

    return { success: true };
  } catch (error) {
    console.error('Submission cache block error:', error);
    return { success: false, error: 'Failed to log your request.' };
  }
}
// Add this to the very bottom of your app/actions.ts file
export async function getWholesaleLeads() {
  try {
    // Safely return the array of inquiries currently held in memory
    return { success: true, data: globalInquiryCache.leads || [] };
  } catch (error) {
    return { success: false, data: [] };
  }
}
