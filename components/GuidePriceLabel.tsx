import { GUIDE_PRICE_NOTE } from '../app/lib/company';

export default function GuidePriceLabel({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs leading-5 text-slate-500 ${className}`}>{GUIDE_PRICE_NOTE}</p>
  );
}
