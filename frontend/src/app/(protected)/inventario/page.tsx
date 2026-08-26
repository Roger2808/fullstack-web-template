"use client";

import { FeaturePageHeader } from "@/shared/ui/FeaturePageHeader";
import { Alert } from "@/shared/ui/Alert";
import { Spinner } from "@/shared/ui/Spinner";
import pageStyles from "@/shared/ui/FeaturePageHeader.module.css";
import { useInventory } from "@/features/inventory/hooks/use-inventory";
import { InventoryItemForm } from "@/features/inventory/components/InventoryItemForm";
import { InventoryList } from "@/features/inventory/components/InventoryList";

export default function InventoryPage() {
  const { items, loading, error, submitting, create, adjustStock } = useInventory();

  return (
    <div className={pageStyles.page}>
      <FeaturePageHeader
        title="Inventario"
        subtitle="Controla los insumos y medicamentos disponibles en la clínica."
      />

      {error && <Alert variant="error">{error}</Alert>}

      <div className={pageStyles.section}>
        <InventoryItemForm onSubmit={create} submitting={submitting} />
      </div>

      <div className={pageStyles.section}>
        {loading ? <Spinner /> : <InventoryList items={items} onAdjustStock={adjustStock} />}
      </div>
    </div>
  );
}
