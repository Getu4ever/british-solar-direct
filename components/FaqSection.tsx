import { SITE_FAQS, type SiteFaq } from '../app/lib/faqs';

type FaqSectionProps = {
  title?: string;
  faqs?: SiteFaq[];
  className?: string;
};

export default function FaqSection({
  title = 'Frequently asked questions',
  faqs = SITE_FAQS,
  className = '',
}: FaqSectionProps) {
  return (
    <section className={className}>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
      <div className="mt-8 space-y-7">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h3 className="mb-1 text-base font-bold text-slate-900">{faq.question}</h3>
            <p className="text-sm leading-6 text-slate-500">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
