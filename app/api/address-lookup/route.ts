import { NextResponse } from 'next/server';

export type AddressLookupResult = {
  id: string;
  line1: string;
  line2: string;
  line3: string;
  postTown: string;
  county: string;
  postcode: string;
  label: string;
};

type IdealAddress = {
  id?: string;
  udprn?: number;
  line_1?: string;
  line_2?: string;
  line_3?: string;
  post_town?: string;
  county?: string;
  postcode?: string;
};

function normalizeUkPostcode(raw: string): string | null {
  const compact = raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (compact.length < 5 || compact.length > 7) return null;
  const inward = compact.slice(-3);
  const outward = compact.slice(0, -3);
  if (!/^[A-Z]{1,2}\d[A-Z\d]?$/.test(outward) || !/^\d[A-Z]{2}$/.test(inward)) {
    return null;
  }
  return `${outward} ${inward}`;
}

function formatAddressLabel(address: IdealAddress): string {
  return [address.line_1, address.line_2, address.line_3, address.post_town, address.postcode]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(', ');
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawPostcode = searchParams.get('postcode')?.trim() ?? '';
  const normalized = normalizeUkPostcode(rawPostcode);

  if (!normalized) {
    return NextResponse.json(
      { error: 'Enter a valid UK postcode (e.g. NG17 8EY).' },
      { status: 400 }
    );
  }

  const apiKey = process.env.IDEAL_POSTCODES_API_KEY || 'ak_test';
  const lookupUrl = `https://api.ideal-postcodes.co.uk/v1/postcodes/${encodeURIComponent(
    normalized
  )}?api_key=${encodeURIComponent(apiKey)}`;

  try {
    const response = await fetch(lookupUrl, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    const payload = (await response.json()) as {
      result?: IdealAddress[];
      message?: string;
      suggestions?: string[];
      code?: number;
    };

    if (response.status === 404) {
      const suggestions = Array.isArray(payload.suggestions) ? payload.suggestions : [];
      return NextResponse.json(
        {
          error: payload.message || 'Postcode not found.',
          suggestions,
        },
        { status: 404 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            payload.message ||
            'Address lookup is temporarily unavailable. Please enter your address manually.',
        },
        { status: response.status >= 500 ? 502 : response.status }
      );
    }

    const addresses: AddressLookupResult[] = (payload.result ?? []).map((item, index) => {
      const line1 = item.line_1?.trim() ?? '';
      const line2 = item.line_2?.trim() ?? '';
      const line3 = item.line_3?.trim() ?? '';
      const postTown = item.post_town?.trim() ?? '';
      const county = item.county?.trim() ?? '';
      const postcode = item.postcode?.trim() || normalized;

      return {
        id: String(item.id ?? item.udprn ?? `${postcode}-${index}`),
        line1,
        line2,
        line3,
        postTown,
        county,
        postcode,
        label: formatAddressLabel({
          line_1: line1,
          line_2: line2,
          line_3: line3,
          post_town: postTown,
          postcode,
        }),
      };
    });

    if (addresses.length === 0) {
      return NextResponse.json(
        { error: 'No addresses found for that postcode.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ postcode: normalized, addresses });
  } catch (error) {
    console.error('Address lookup error:', error);
    return NextResponse.json(
      {
        error: 'Address lookup failed. Please enter your address manually.',
      },
      { status: 502 }
    );
  }
}
