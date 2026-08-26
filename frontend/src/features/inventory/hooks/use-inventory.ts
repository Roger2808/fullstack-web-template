"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError } from "@/shared/api/config";
import { inventoryApi } from "../api";
import { CreateInventoryItemInput, InventoryItem } from "../types";

export function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await inventoryApi.list());
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const create = useCallback(
    async (input: CreateInventoryItemInput) => {
      setSubmitting(true);
      setError(null);
      try {
        await inventoryApi.create(input);
        await load();
        return true;
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "No se pudo registrar el artículo.");
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [load],
  );

  const adjustStock = useCallback(
    async (id: string, delta: number) => {
      setError(null);
      try {
        await inventoryApi.adjustStock(id, delta);
        await load();
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "No se pudo ajustar el stock.");
      }
    },
    [load],
  );

  return { items, loading, error, submitting, create, adjustStock };
}
