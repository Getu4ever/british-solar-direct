import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '../../lib/admin-auth';
import type {
  AnalyticsPayload,
  AnalyticsSummary,
  NottsLocalSourceRow,
} from '../../lib/analytics-types';

export type { AnalyticsPayload, AnalyticsSummary, NottsLocalSourceRow };

/** Default GA4 property for Measurement ID G-N1HB4206BV */
const DEFAULT_PROPERTY_ID = '549213644';

function metricValue(
  row: { metricValues?: Array<{ value?: string | null }> | null } | undefined,
  index: number
): number {
  const raw = row?.metricValues?.[index]?.value;
  const parsed = Number(raw ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

type ServiceAccountCredentials = {
  client_email: string;
  private_key: string;
};

function resolveCredentials(): ServiceAccountCredentials {
  const jsonRaw = process.env.GA_SERVICE_ACCOUNT_JSON?.trim();
  if (jsonRaw) {
    const parsed = JSON.parse(jsonRaw) as {
      client_email?: string;
      private_key?: string;
    };
    if (!parsed.client_email || !parsed.private_key) {
      throw new Error(
        'GA_SERVICE_ACCOUNT_JSON must include client_email and private_key.'
      );
    }
    return {
      client_email: parsed.client_email,
      private_key: parsed.private_key.replace(/\\n/g, '\n'),
    };
  }

  const clientEmail = process.env.GA_CLIENT_EMAIL?.trim();
  const privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!clientEmail || !privateKey) {
    throw new Error(
      'Missing GA credentials. Set GA_SERVICE_ACCOUNT_JSON, or GA_CLIENT_EMAIL + GA_PRIVATE_KEY.'
    );
  }

  return { client_email: clientEmail, private_key: privateKey };
}

function getAnalyticsClient() {
  const credentials = resolveCredentials();
  return new BetaAnalyticsDataClient({ credentials });
}

/**
 * GA4 Data API for the admin dashboard.
 * Auth: admin session cookie (route) + middleware matcher for /api/analytics.
 */
export async function GET() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const propertyId =
    process.env.GA_PROPERTY_ID?.trim() || DEFAULT_PROPERTY_ID;

  try {
    const client = getAnalyticsClient();
    const property = `properties/${propertyId}`;
    const dateRanges = [{ startDate: '30daysAgo', endDate: 'today' }];

    const [[summaryResponse], [sourcesResponse]] = await Promise.all([
      client.runReport({
        property,
        dateRanges,
        metrics: [
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'sessions' },
        ],
      }),
      client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: 'sessionSource' }, { name: 'pagePath' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'screenPageViews' },
        ],
        dimensionFilter: {
          filter: {
            fieldName: 'pagePath',
            stringFilter: {
              matchType: 'BEGINS_WITH',
              value: '/notts-local',
            },
          },
        },
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 50,
      }),
    ]);

    const summaryRow = summaryResponse.rows?.[0];
    const summary: AnalyticsSummary = {
      activeUsers: metricValue(summaryRow, 0),
      pageViews: metricValue(summaryRow, 1),
      sessions: metricValue(summaryRow, 2),
    };

    const sourceTotals = new Map<string, NottsLocalSourceRow>();

    for (const row of sourcesResponse.rows ?? []) {
      const source = row.dimensionValues?.[0]?.value?.trim() || '(direct)';
      const pagePath = row.dimensionValues?.[1]?.value?.trim() || '/notts-local';
      const activeUsers = metricValue(row, 0);
      const sessions = metricValue(row, 1);
      const pageViews = metricValue(row, 2);
      const key = source.toLowerCase();
      const existing = sourceTotals.get(key);

      if (existing) {
        existing.activeUsers += activeUsers;
        existing.sessions += sessions;
        existing.pageViews += pageViews;
      } else {
        sourceTotals.set(key, {
          source,
          pagePath,
          activeUsers,
          sessions,
          pageViews,
        });
      }
    }

    const nottsLocalSources = [...sourceTotals.values()].sort(
      (a, b) => b.activeUsers - a.activeUsers
    );

    const payload: AnalyticsPayload = {
      range: { startDate: '30daysAgo', endDate: 'today' },
      propertyId,
      measurementIdHint: 'G-N1HB4206BV',
      summary,
      nottsLocalSources,
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.error('GA4 analytics fetch failed:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to fetch Google Analytics data.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
