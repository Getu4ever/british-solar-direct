export const PIPELINE_STATUSES = [
  'new_lead',
  'survey_scheduled',
  'deposit_paid',
  'in_progress',
  'completed_paid',
] as const;

export type PipelineStatus = (typeof PIPELINE_STATUSES)[number];

export const PIPELINE_STATUS_LABELS: Record<PipelineStatus, string> = {
  new_lead: 'New lead',
  survey_scheduled: 'Survey scheduled',
  deposit_paid: 'Deposit paid',
  in_progress: 'In progress',
  completed_paid: 'Completed & paid',
};

const PROCUREMENT_STATUSES: PipelineStatus[] = [
  'deposit_paid',
  'in_progress',
  'completed_paid',
];

export function isPipelineStatus(value: string): value is PipelineStatus {
  return (PIPELINE_STATUSES as readonly string[]).includes(value);
}

export function normalizePipelineStatus(value: string | null | undefined): PipelineStatus {
  if (value && isPipelineStatus(value)) {
    return value;
  }
  return 'new_lead';
}

export function showsProcurementTracker(status: string | null | undefined): boolean {
  return PROCUREMENT_STATUSES.includes(normalizePipelineStatus(status));
}

export function poundsToPence(pounds: number): number {
  return Math.round(pounds * 100);
}

export function penceToPounds(pence: number | null | undefined): number {
  return (pence ?? 0) / 100;
}

export function formatGbpFromPence(pence: number | null | undefined): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(penceToPounds(pence));
}

export function sumProjectExpensesPence(input: {
  panelCostPence?: number | null;
  batteryInverterCostPence?: number | null;
  scaffoldingCostPence?: number | null;
  contractorLaborCostPence?: number | null;
}): number {
  return (
    (input.panelCostPence ?? 0) +
    (input.batteryInverterCostPence ?? 0) +
    (input.scaffoldingCostPence ?? 0) +
    (input.contractorLaborCostPence ?? 0)
  );
}

export function computeProjectLedger(input: {
  agreedTotalPricePence?: number | null;
  panelCostPence?: number | null;
  batteryInverterCostPence?: number | null;
  scaffoldingCostPence?: number | null;
  contractorLaborCostPence?: number | null;
}) {
  const agreedTotalPence = input.agreedTotalPricePence ?? 0;
  const totalExpensesPence = sumProjectExpensesPence(input);
  const netProfitPence = agreedTotalPence - totalExpensesPence;
  const equitySharePence = Math.round(netProfitPence / 2);

  return {
    agreedTotalPence,
    totalExpensesPence,
    netProfitPence,
    equitySharePence,
  };
}

export function computeCompletedPaidMetrics(
  projects: Array<{
    status?: string | null;
    agreedTotalPricePence?: number | null;
    panelCostPence?: number | null;
    batteryInverterCostPence?: number | null;
    scaffoldingCostPence?: number | null;
    contractorLaborCostPence?: number | null;
  }>
) {
  const completed = projects.filter(
    (project) => normalizePipelineStatus(project.status) === 'completed_paid'
  );

  let grossRevenuePence = 0;
  let capitalReinvestedPence = 0;

  for (const project of completed) {
    grossRevenuePence += project.agreedTotalPricePence ?? 0;
    capitalReinvestedPence += sumProjectExpensesPence(project);
  }

  const distributableProfitPence = grossRevenuePence - capitalReinvestedPence;
  const equityDrawdownPoolPence = Math.round(distributableProfitPence / 2);

  return {
    completedCount: completed.length,
    grossRevenuePence,
    capitalReinvestedPence,
    distributableProfitPence,
    equityDrawdownPoolPence,
  };
}

export function milestoneSchedulePence(agreedTotalPricePence: number) {
  const deposit = Math.round(agreedTotalPricePence * 0.1);
  const hardware = Math.round(agreedTotalPricePence * 0.6);
  const handover = agreedTotalPricePence - deposit - hardware;

  return {
    depositPence: deposit,
    hardwarePence: hardware,
    handoverPence: handover,
  };
}
