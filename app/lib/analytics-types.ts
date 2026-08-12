export type AnalyticsSummary = {
  activeUsers: number;
  pageViews: number;
  sessions: number;
};

/** Matches GA Realtime overview — users active in the last ~30 minutes. */
export type AnalyticsRealtime = {
  activeUsers: number;
};

export type NottsLocalSourceRow = {
  source: string;
  pagePath: string;
  activeUsers: number;
  sessions: number;
  pageViews: number;
};

export type AnalyticsPayload = {
  range: { startDate: string; endDate: string };
  propertyId: string;
  measurementIdHint: string;
  realtime: AnalyticsRealtime;
  summary: AnalyticsSummary;
  nottsLocalSources: NottsLocalSourceRow[];
};
