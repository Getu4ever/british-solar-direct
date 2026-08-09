import Image from 'next/image';
import Link from 'next/link';
import './longi-stack.css';

/*
 * =============================================================================
 * MIDJOURNEY / DALL-E ASSET PROMPTS (render externally if regenerating)
 * =============================================================================
 *
 * Image 1 (Section 1 — Architectural roof):
 * "Architectural photography of a modern British luxury brick home in Nottingham, roof seamlessly integrated with sleek all-black premium LONGi solar panels, crisp overcast afternoon lighting, highly professional construction aesthetic, photo-realistic 8k --ar 16:9"
 *
 * Image 2 (Section 2 — HPBC 2.0 cell):
 * "Macro studio electronic detail photography of a premium N-Type HPBC 2.0 solar cell, entirely matte black, busbar-free smooth crystalline face capturing soft subtle refractions of light, clean futuristic engineering design, 8k --ar 16:9"
 *
 * Local paths:
 *   /images/ecolife-architectural-roof.png
 *   /images/ecolife-hpbc-cell.png
 * =============================================================================
 */

/**
 * Sticky card stacking (desktop):
 * Ad 1 pins as the base layer → Ad 2 slides up and covers it →
 * Ad 3 slides up and covers Ad 2 → then normal page content continues.
 *
 * Implemented with real CSS position:sticky (not a fake 300vh spacer),
 * so there is no empty white runway when sticky is active.
 */
export default function LongiEcoLifeAds() {
  return (
    <div className="longi-stack">
      {/* AD 1 — base layer */}
      <section className="longi-stack__card longi-stack__card--1">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 py-12 md:grid-cols-2 md:px-12 md:py-0">
          <div>
            <span className="mb-3 block text-sm font-bold tracking-widest text-amber-500 uppercase">
              UNCOMPROMISING AESTHETICS
            </span>
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              Engineered to blend in. Powered to stand out.
            </h2>
            <p className="text-lg leading-relaxed text-zinc-400">
              Traditional solar arrays disrupt your home&apos;s rooflines with unsightly silver
              tracks and prominent busbars. The LONGi EcoLife™ 480W framework introduces a premium,
              unified matte-black profile designed to integrate seamlessly directly onto Nottingham
              residential rooftops.
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <Image
              src="/images/ecolife-architectural-roof.png"
              alt="Modern Nottingham brick home with seamless all-black LONGi EcoLife solar panels"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={82}
            />
          </div>
        </div>
      </section>

      {/* AD 2 — slides up and covers Ad 1 */}
      <section className="longi-stack__card longi-stack__card--2">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 py-12 md:grid-cols-2 md:px-12 md:py-0">
          <div className="relative order-2 aspect-video overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 md:order-1">
            <Image
              src="/images/ecolife-hpbc-cell.png"
              alt="Macro detail of a busbar-free matte-black HPBC 2.0 solar cell surface"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={82}
            />
          </div>
          <div className="order-1 md:order-2">
            <span className="mb-3 block text-sm font-bold tracking-widest text-amber-500 uppercase">
              BREAKTHROUGH CELL ARCHITECTURE
            </span>
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              Maximized voltage under cloudy Nottingham skies.
            </h2>
            <p className="text-lg leading-relaxed text-zinc-400">
              By moving all electrical connections and busbars entirely to the back-side of the cell
              via next-generation HPBC 2.0 technology, we leave the front face completely
              unobstructed. The result? A 23.3% efficiency rating that absorbs maximum light voltage
              even on the most overcast East Midlands days.
            </p>
          </div>
        </div>
      </section>

      {/* AD 3 — slides up and covers Ad 2 */}
      <section className="longi-stack__card longi-stack__card--3">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center md:px-12 md:py-0">
          <span className="mb-3 block text-sm font-bold tracking-widest text-amber-500 uppercase">
            0% VAT GREEN ENERGY RELIEF
          </span>
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            An institutional-grade upgrade with immediate grid returns.
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-zinc-400">
            Combine Tier-1 generation power with smart lithium battery storage banks to entirely
            eliminate peak-rate evening energy charges. Managed locally from initial scaffolding to
            final MCS grid certification by Director Juma Mohammedi.
          </p>
          <Link
            href="/project-quote"
            className="inline-block rounded-xl bg-amber-500 px-8 py-4 text-lg font-bold text-black shadow-lg transition-colors duration-200 hover:bg-amber-600"
          >
            Request Your Fixed Quote Within 24 Hours
          </Link>
        </div>
      </section>
    </div>
  );
}
