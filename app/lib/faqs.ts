import { PAYMENT_NOTE } from './company';

export type SiteFaq = {
  question: string;
  answer: string;
};

/** Shared FAQs used for visible FAQ sections and FAQPage JSON-LD. */
export const SITE_FAQS: SiteFaq[] = [
  {
    question: 'Can you deliver to my home?',
    answer:
      'Yes. Confirm your postcode and basic driveway or frontage access details in your quote form, and we will schedule suitable delivery van access directly to your home site.',
  },
  {
    question: 'How long does a standard installation take?',
    answer:
      'Most typical residential arrays take 1 to 2 days to fully mount, wire, and connect to your home grid once scaffolding is live.',
  },
  {
    question: 'Can Juma install the panels?',
    answer:
      'Yes. Juma has over 20 years of building experience in Nottingham. Select installation on your quote request and we will include fitting options.',
  },
  {
    question: 'Are grid approvals handled?',
    answer:
      'Yes. We manage your full DNO grid notification paperwork and arrange final MCS certification handover end-to-end.',
  },
  {
    question: 'How do I pay?',
    answer: PAYMENT_NOTE,
  },
];

export function buildFaqPageJsonLd(faqs: SiteFaq[] = SITE_FAQS) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
