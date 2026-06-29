'use client'

import React, { useState } from 'react';

export default function Calculator() {
  const [supplyTrack, setSupplyTrack] = useState<'uk' | 'china'>('uk');
  const [palletCount, setPalletCount] = useState<number>(1);

  const panelsPerPallet = 36;
  const totalPanels = palletCount * panelsPerPallet;
  const panelPrice = supplyTrack === 'uk' ? 49 : 42;
  const totalValue = totalPanels * panelPrice;

  return (
    <section id="calculator" className="bg-slate-100 py-16 px-4 border-t border-b border-slate-200">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Interactive Wholesale Logistics Matrix</h2>
          <p className="text-slate-500 text-sm mt-1">Select your fulfillment channel to evaluate cargo timelines and wholesale order values instantly.</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-slate-200 p-1 rounded-xl inline-flex shadow-inner">
            <button type="button" onClick={() => { setSupplyTrack('uk'); setPalletCount(1); }} className={`px-4 py-2 rounded-lg font-bold text-xs transition ${supplyTrack === 'uk' ? 'bg-white text-slate-900 shadow' : 'text-slate-600'}`}>🇬🇧 UK Warehouse Dispatch</button>
            <button type="button" onClick={() => { setSupplyTrack('china'); setPalletCount(10); }} className={`px-4 py-2 rounded-lg font-bold text-xs transition ${supplyTrack === 'china' ? 'bg-white text-slate-900 shadow' : 'text-slate-600'}`}>🇨🇳 Direct Factory Cargo</button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="md:col-span-1 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Volume: {palletCount} Pallets</label>
            <input type="range" min={supplyTrack === 'uk' ? 1 : 10} max="50" value={palletCount} onChange={(e) => setPalletCount(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" />
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-xs text-slate-500 block">Total Module Count</span>
              <span className="text-base font-bold">{totalPanels} Panels</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl">
              <span className="text-xs text-slate-500 block">Estimated Lead Time</span>
              <span className="text-base font-bold text-amber-600">{supplyTrack === 'uk' ? "2-3 Day Freight" : "6-8 Week Sea Cargo"}</span>
            </div>
            <div className="col-span-2 bg-slate-900 p-3 rounded-xl text-xs text-slate-300 font-medium">
              Estimated Wholesale Value: <strong className="text-white">£{totalValue.toLocaleString()}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
