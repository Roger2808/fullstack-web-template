import { apiFetch, DEMO_CLINIC_ID } from "@/shared/api/config";
import { CreateInventoryItemInput, InventoryItem } from "./types";

export const inventoryApi = {
  list: () => apiFetch<InventoryItem[]>(`/inventory?clinicId=${DEMO_CLINIC_ID}`),

  create: (input: CreateInventoryItemInput) =>
    apiFetch<InventoryItem>("/inventory", {
      method: "POST",
      body: JSON.stringify({ ...input, clinicId: DEMO_CLINIC_ID }),
    }),

  adjustStock: (id: string, delta: number) =>
    apiFetch<InventoryItem>(`/inventory/${id}/adjust-stock`, {
      method: "PATCH",
      body: JSON.stringify({ delta }),
    }),
};
