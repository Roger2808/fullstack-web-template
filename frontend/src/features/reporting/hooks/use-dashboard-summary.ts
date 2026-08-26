"use client";

import { useEffect, useState } from "react";
import { ApiError } from "@/shared/api/config";
import { reportingApi } from "../api";
import { DashboardSummary } from "../types";

export function useDashboardSummary() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    reportingApi
      .getSummary()
      .then((data) => {
        if (active) setSummary(data);
      })
      .catch((err) => {
        if (active) {
          setError(err instanceof ApiError ? err.message : "No se pudo conectar con el servidor.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { summary, loading, error };
}
