type GtagCommand = 'config' | 'event' | 'js' | 'set';

declare global {
  interface Window {
    gtag?: (
      command: GtagCommand,
      targetOrEventName: string | Date,
      params?: Record<string, string | number | boolean>
    ) => void;
  }
}

/** Fire GA4 recommended lead event after a successful form submit. */
export function trackGenerateLead(leadSource: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'generate_lead', {
    currency: 'GBP',
    value: 1,
    lead_source: leadSource,
  });
}
