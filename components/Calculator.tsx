'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BatteryCharging,
  Home,
  House,
  Landmark,
  PoundSterling,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Zap,
} from 'lucide-react';

type TierKey = 'small' | 'medium' | 'large';

const sliderMin = 50;
const sliderMax = 500;

const tierOrder: TierKey[] = ['small', 'medium', 'large'];
const profileOptions = {
  small: {
    label: 'Small / Cottage',
    description: '1-2 Bedroom / Small Roof',
    presetBill: 95,
    icon: Home,
  },
  medium: {
    label: 'Medium / Family',
    description: '3-4 Bedroom / Standard Roof',
    presetBill: 185,
    icon: House,
  },
  large: {
    label: 'Large / Estate',
    description: '5+ Bedroom / Large Roof',
    presetBill: 320,
    icon: Landmark,
  },
} as const;

const tiers = {
  small: {
    packageName: 'The Cottage Setup',
    panels: '9 Panels (4.32kW Array)',
    battery: '5kWh Hybrid Bank',
    scaffolding: 'Included',
    baseGuidePrice: '£5,500 (0% VAT)',
    quoteParam: 'cottage-setup-4kw',
  },
  medium: {
    packageName: 'The Family Homestead',
    panels: '18 Panels (8.64kW Array)',
    battery: '10kWh Storage Stack',
    scaffolding: 'Included',
    baseGuidePrice: '£9,750 (0% VAT)',
    quoteParam: 'family-homestead-8kw',
  },
  large: {
    packageName: 'The Estate Powerhouse',
    panels: '26 Panels (12.48kW Array)',
    battery: '15kWh Multi-Stack Array',
    scaffolding: 'Included',
    baseGuidePrice: 'Custom Quote Required',
    quoteParam: 'estate-powerhouse-12kw',
  },
} as const;

export default function Calculator() {
  const [selectedProfile, setSelectedProfile] = useState<TierKey>('medium');
  const [monthlyBill, setMonthlyBill] = useState<number>(profileOptions.medium.presetBill);

  const sliderPercentage = ((monthlyBill - sliderMin) / (sliderMax - sliderMin)) * 100;

  function getTierRank(tier: TierKey): number {
    return tierOrder.indexOf(tier);
  }

  function getTierFromBill(bill: number): TierKey {
    if (bill < 120) {
      return 'small';
    }

    if (bill <= 250) {
      return 'medium';
    }

    return 'large';
  }

  const billTier = getTierFromBill(monthlyBill);
  const recommendedTier =
    getTierRank(selectedProfile) > getTierRank(billTier) ? selectedProfile : billTier;

  const activeTier = tiers[recommendedTier];
  const ActiveProfileIcon = profileOptions[recommendedTier].icon;

  const quoteParams = new URLSearchParams({
    product: activeTier.quoteParam,
    tier: recommendedTier,
    profile: profileOptions[selectedProfile].description,
    monthlyBill: String(monthlyBill),
  }).toString();

  const monthlyBillDisplay = monthlyBill >= sliderMax ? '£500+' : `£${monthlyBill}`;

  return (
    <section id="calculator" className="border-y border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.14),_transparent_28%),linear-gradient(180deg,_#f8fafc,_#eef2f7)] px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-800/80 bg-[linear-gradient(160deg,rgba(15,23,42,0.96),rgba(17,24,39,0.92)),radial-gradient(circle_at_top,rgba(251,191,36,0.18),transparent_40%)] p-6 text-white shadow-[0_25px_80px_rgba(15,23,42,0.35)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_24%)]" />
            <div className="relative">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
                    Home Profile Inputs
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    Build your residential system estimate
                  </h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm">
                  UK homeowner tool
                </div>
              </div>

              <div className="mb-8">
                <p className="mb-4 text-sm font-semibold text-white">Property Profile Selector</p>
                <div className="grid gap-3">
                  {tierOrder.map((tierKey) => {
                    const option = profileOptions[tierKey];
                    const ProfileIcon = option.icon;
                    const isActive = selectedProfile === tierKey;

                    return (
                      <button
                        key={tierKey}
                        type="button"
                        onClick={() => {
                          setSelectedProfile(tierKey);
                          setMonthlyBill(option.presetBill);
                        }}
                        className={`rounded-2xl border p-4 text-left transition-all duration-300 ease-in-out ${
                          isActive
                            ? 'border-amber-400/70 bg-amber-400/10 shadow-[0_0_0_1px_rgba(251,191,36,0.25)]'
                            : 'border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                              isActive ? 'bg-amber-400 text-slate-950' : 'bg-white/10 text-amber-300'
                            }`}
                          >
                            <ProfileIcon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{option.label}</p>
                            <p className="mt-1 text-sm leading-6 text-slate-300">{option.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="mb-12 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">Monthly Electricity Bill</p>
                    <p className="mt-1 text-sm text-slate-300">
                      Drag to match your current household electricity spend.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Current bill</p>
                    <p className="mt-1 text-2xl font-bold text-white">{monthlyBillDisplay}</p>
                  </div>
                </div>

                <div className="relative px-1 pb-2 pt-10">
                  <motion.div
                    className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-xl border border-amber-300/40 bg-amber-400 px-3 py-2 text-sm font-bold text-slate-950 shadow-lg"
                    animate={{ left: `calc(${sliderPercentage}% + (${8 - sliderPercentage * 0.16}px))` }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    {monthlyBillDisplay}
                  </motion.div>

                  <input
                    type="range"
                    min={sliderMin}
                    max={sliderMax}
                    step={5}
                    value={monthlyBill}
                    onChange={(event) => setMonthlyBill(Number(event.target.value))}
                    className="h-3 w-full cursor-pointer appearance-none rounded-full bg-transparent accent-amber-400"
                    style={{
                      background: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${sliderPercentage}%, rgba(255,255,255,0.12) ${sliderPercentage}%, rgba(255,255,255,0.12) 100%)`,
                    }}
                  />

                  <div className="mt-3 flex justify-between text-xs font-medium text-slate-400">
                    <span>£50</span>
                    <span>£120</span>
                    <span>£250</span>
                    <span>£500+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-amber-200/70 bg-[linear-gradient(160deg,#fffdf7,#fff7db_52%,#ecfdf5)] p-6 shadow-[0_30px_90px_rgba(148,163,184,0.28)] ring-1 ring-amber-100/80">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.2),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.16),transparent_24%)]" />
            <div className="relative">
              <div className="mb-6 flex flex-col gap-4 border-b border-slate-200/80 pb-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-amber-400 shadow-sm">
                    <ActiveProfileIcon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                      Live recommendation
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.h3
                        key={activeTier.packageName}
                        initial={{ opacity: 0, y: 14, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.98 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                        className="text-3xl font-extrabold tracking-tight text-slate-950"
                      >
                        {activeTier.packageName}
                      </motion.h3>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm backdrop-blur-sm">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  0% Green Energy Tax Rate Applied
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <motion.div
                  layout
                  className="rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur-sm"
                >
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                    <SunMedium className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Recommended Array
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeTier.panels}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                      className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950"
                    >
                      {activeTier.panels}
                    </motion.p>
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  layout
                  className="rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur-sm"
                >
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                    <BatteryCharging className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Battery Storage
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeTier.battery}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                      className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950"
                    >
                      {activeTier.battery}
                    </motion.p>
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  layout
                  className="rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur-sm"
                >
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Scaffolding / DNO
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeTier.scaffolding}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                      className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950"
                    >
                      {activeTier.scaffolding}
                    </motion.p>
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  layout
                  className="rounded-2xl border border-amber-200 bg-slate-950 p-5 text-white shadow-lg"
                >
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
                    <PoundSterling className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                    Turnkey Guide Price (0% VAT)
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeTier.baseGuidePrice}
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.98 }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                      className="mt-3 text-4xl font-extrabold tracking-tight text-white"
                    >
                      {activeTier.baseGuidePrice}
                    </motion.p>
                  </AnimatePresence>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Full scaffolding, inverter, battery storage, and Juma&apos;s local engineering installation are included.
                  </p>
                </motion.div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white/70 p-5 shadow-sm backdrop-blur-sm">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Estimator Snapshot
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Based on a {profileOptions[selectedProfile].description.toLowerCase()} and a current electricity spend of {monthlyBillDisplay}.
                    </p>
                  </div>
                  <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Real-time recommendation
                  </div>
                </div>

                <Link
                  href={`/project-quote?${quoteParams}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-400 px-6 py-4 text-base font-bold text-slate-950 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:from-amber-400 hover:to-orange-300 hover:shadow-xl"
                >
                  Lock In This Estimate &amp; Request Quote
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
