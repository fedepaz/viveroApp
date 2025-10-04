//src/features/purchase-orders/components/purchase-order-data-table.tsx
"use client";

import { DataTable } from "@/components/data-display/data-table";
import { purchaseOrderColumns } from "./columns";
import { usePurchaseOrders } from "../hooks/hooks";
import { PurchaseOrder } from "../types";
import { useTranslations } from "next-intl";

export function PurchaseOrdersDataTable() {
  const t = useTranslations("PurchaseOrderDataTable");
  const { data: purchaseOrders = [] } = usePurchaseOrders();

  //const createPurchaseOrder = useCreatePurchaseOrder();
  //const updatePurchaseOrder = useUpdatePurchaseOrder();
  //const deletePurchaseOrder = useDeletePurchaseOrder();

  const handleEdit = (row: PurchaseOrder) => {
    console.log("Edit purchase order:", row);
    // Implement edit functionality
  };

  const handleDelete = (row: PurchaseOrder) => {
    console.log("Delete purchase order:", row);
    // Implement delete functionality
  };

  const handleAdd = () => {
    console.log("Add new purchase order");
    // Implement add functionality
  };

  const handleExport = () => {
    console.log("Export purchase orders data");
    // Implement export functionality
  };

  return (
    <DataTable
      columns={purchaseOrderColumns}
      data={purchaseOrders}
      title={t("title")}
      description={t("description")}
      searchKey="orderNumber"
      searchPlaceholder={t("searchPlaceholder")}
      totalCount={purchaseOrders.length}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onExport={handleExport}
    />
  );
}
