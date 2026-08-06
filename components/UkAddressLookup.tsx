'use client';

import React, { useEffect, useMemo, useState } from 'react';

type AddressOption = {
  id: string;
  line1: string;
  line2: string;
  line3: string;
  postTown: string;
  county: string;
  postcode: string;
  label: string;
};

type UkAddressLookupProps = {
  name?: string;
  label?: string;
  required?: boolean;
  variant?: 'light' | 'dark';
};

function composeFullAddress(parts: {
  line1: string;
  line2: string;
  line3: string;
  postTown: string;
  county: string;
  postcode: string;
}): string {
  return [parts.line1, parts.line2, parts.line3, parts.postTown, parts.county, parts.postcode]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(', ');
}

export default function UkAddressLookup({
  name = 'deliveryPostcode',
  label = 'Installation location',
  required = false,
  variant = 'light',
}: UkAddressLookupProps) {
  const [postcodeQuery, setPostcodeQuery] = useState('');
  const [addresses, setAddresses] = useState<AddressOption[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [line3, setLine3] = useState('');
  const [postTown, setPostTown] = useState('');
  const [county, setCounty] = useState('');
  const [postcode, setPostcode] = useState('');
  const [showManual, setShowManual] = useState(required);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const isDark = variant === 'dark';

  const labelClass = isDark
    ? 'mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-400'
    : 'mb-1 block text-sm font-semibold text-slate-900';

  const inputClass = isDark
    ? 'w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-white outline-none focus:border-amber-500'
    : 'w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-amber-500';

  const helperClass = isDark ? 'text-xs text-slate-500' : 'text-xs text-slate-500';
  const buttonClass = isDark
    ? 'shrink-0 rounded-lg bg-amber-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400'
    : 'shrink-0 rounded-lg bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300';

  const fullAddress = useMemo(
    () => composeFullAddress({ line1, line2, line3, postTown, county, postcode }),
    [line1, line2, line3, postTown, county, postcode]
  );

  useEffect(() => {
    if (fullAddress) {
      setShowManual(true);
    }
  }, [fullAddress]);

  async function findAddress() {
    setLoading(true);
    setMessage(null);
    setSuggestions([]);
    setAddresses([]);
    setSelectedId('');

    try {
      const response = await fetch(
        `/api/address-lookup?postcode=${encodeURIComponent(postcodeQuery.trim())}`
      );
      const payload = (await response.json()) as {
        addresses?: AddressOption[];
        postcode?: string;
        error?: string;
        suggestions?: string[];
      };

      if (!response.ok) {
        setSuggestions(payload.suggestions ?? []);
        setMessage(payload.error ?? 'Unable to find that postcode.');
        setShowManual(true);
        if (payload.postcode) setPostcode(payload.postcode);
        return;
      }

      const found = payload.addresses ?? [];
      setAddresses(found);
      setPostcode(payload.postcode ?? postcodeQuery.toUpperCase());
      setShowManual(true);
      setMessage(
        found.length === 1
          ? '1 address found — confirm or edit the details below.'
          : `${found.length} addresses found — select your property.`
      );
    } catch {
      setMessage('Address lookup failed. Please enter your address manually.');
      setShowManual(true);
    } finally {
      setLoading(false);
    }
  }

  function applyAddress(address: AddressOption) {
    setSelectedId(address.id);
    setLine1(address.line1);
    setLine2(address.line2);
    setLine3(address.line3);
    setPostTown(address.postTown);
    setCounty(address.county);
    setPostcode(address.postcode);
    setShowManual(true);
    setMessage(null);
  }

  function onSelectChange(value: string) {
    setSelectedId(value);
    const match = addresses.find((item) => item.id === value);
    if (match) applyAddress(match);
  }

  return (
    <div className="space-y-3">
      <div>
        <label className={labelClass}>
          {label}
          {required ? ' *' : ''}
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={postcodeQuery}
            onChange={(e) => setPostcodeQuery(e.target.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                void findAddress();
              }
            }}
            className={`${inputClass} uppercase sm:flex-1`}
            placeholder="e.g. NG17 8EY"
            autoComplete="postal-code"
            inputMode="text"
            aria-label="UK postcode"
          />
          <button
            type="button"
            onClick={() => void findAddress()}
            disabled={loading || !postcodeQuery.trim()}
            className={buttonClass}
          >
            {loading ? 'Finding…' : 'Find address'}
          </button>
        </div>
        <p className={`mt-1.5 ${helperClass}`}>
          Enter your postcode, then choose the correct street / property from the list.
        </p>
      </div>

      {message && (
        <p
          className={`text-sm ${
            addresses.length > 0
              ? isDark
                ? 'text-emerald-300'
                : 'text-emerald-700'
              : isDark
                ? 'text-amber-300'
                : 'text-amber-700'
          }`}
        >
          {message}
        </p>
      )}

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                setPostcodeQuery(suggestion);
                setSuggestions([]);
              }}
              className={
                isDark
                  ? 'rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs font-semibold text-amber-300 hover:border-amber-500'
                  : 'rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-amber-500'
              }
            >
              Try {suggestion}
            </button>
          ))}
        </div>
      )}

      {addresses.length > 0 && (
        <div>
          <label className={labelClass}>Select your address</label>
          <select
            value={selectedId}
            onChange={(e) => onSelectChange(e.target.value)}
            className={inputClass}
          >
            <option value="">Choose street / property…</option>
            {addresses.map((address) => (
              <option key={address.id} value={address.id}>
                {address.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {!showManual && (
        <button
          type="button"
          onClick={() => setShowManual(true)}
          className={
            isDark
              ? 'text-sm font-medium text-amber-400 hover:text-amber-300'
              : 'text-sm font-medium text-slate-700 underline hover:text-slate-900'
          }
        >
          Enter address manually
        </button>
      )}

      {showManual && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass}>Address line 1{required ? ' *' : ''}</label>
            <input
              type="text"
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
              required={required}
              className={inputClass}
              placeholder="House number and street name"
              autoComplete="address-line1"
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Address line 2</label>
            <input
              type="text"
              value={line2}
              onChange={(e) => setLine2(e.target.value)}
              className={inputClass}
              placeholder="Flat, building, or estate (optional)"
              autoComplete="address-line2"
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Address line 3</label>
            <input
              type="text"
              value={line3}
              onChange={(e) => setLine3(e.target.value)}
              className={inputClass}
              placeholder="Optional"
              autoComplete="address-line3"
            />
          </div>
          <div>
            <label className={labelClass}>Town / city{required ? ' *' : ''}</label>
            <input
              type="text"
              value={postTown}
              onChange={(e) => setPostTown(e.target.value)}
              required={required}
              className={inputClass}
              placeholder="e.g. Nottingham"
              autoComplete="address-level2"
            />
          </div>
          <div>
            <label className={labelClass}>County</label>
            <input
              type="text"
              value={county}
              onChange={(e) => setCounty(e.target.value)}
              className={inputClass}
              placeholder="Optional"
              autoComplete="address-level1"
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Postcode{required ? ' *' : ''}</label>
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              required={required}
              className={`${inputClass} uppercase`}
              placeholder="e.g. NG17 8EY"
              autoComplete="postal-code"
            />
          </div>
        </div>
      )}

      <input type="hidden" name={name} value={fullAddress} />
    </div>
  );
}
