import { apiFetch, DEMO_CLINIC_ID } from "@/shared/api/config";
import { DashboardSummary } from "./types";

export const reportingApi = {
  getSummary: () => apiFetch<DashboardSummary>(`/reporting/summary?clinicId=${DEMO_CLINIC_ID}`),
};
