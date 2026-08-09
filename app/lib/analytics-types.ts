export type AnalyticsSummary = {
  activeUsers: number;
  pageViews: number;
  sessions: number;
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
  summary: AnalyticsSummary;
  nottsLocalSources: NottsLocalSourceRow[];
};
