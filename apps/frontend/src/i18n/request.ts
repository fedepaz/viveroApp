// src/i18n/request.ts

import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  // Get the locale from the request
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: {
      ...(await import(`../../messages/${locale}/common.json`)).default,
      ...(await import(`../../messages/${locale}/main.json`)).default,
      ...(await import(`../../messages/${locale}/alerts.json`)).default,
      ...(await import(`../../messages/${locale}/navigation.json`)).default,
      ...(
        await import(
          `../components/layout/dashboard-header/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/common/language-switcher/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/common/theme-toggle/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/common/LoadingSpinner/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/data-display/data-table/column-filters/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/data-display/data-table/data-table/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../components/data-display/data-table/data-table/messages/${locale}.json`
        )
      ).default,

      // Clients Feature
      ...(
        await import(
          `../features/clients/components/ClientsDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/clients/components/ClientsDashboardSkeleton/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/clients/components/ClientsDataTable/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/clients/components/ClientsKpi/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/clients/components/Columns/messages/${locale}.json`
        )
      ).default,

      // Dashboard Feature
      ...(
        await import(
          `../features/dashboard/components/RootDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/DashboardAlerts/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/DashboardKpi/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/FeatureNavigation/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/RecentActivity/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/dashboard/components/RootDashboardSkeleton/messages/${locale}.json`
        )
      ).default,

      // Invoices Feature
      ...(
        await import(
          `../features/invoices/components/InvoicesDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/invoices/components/InvoicesDashboardSkeleton/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/invoices/components/Columns/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/invoices/components/InvoiceForm/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/invoices/components/InvoicesDataTable/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/invoices/components/InvoicesKpi/messages/${locale}.json`
        )
      ).default,

      // Plants Feature
      ...(
        await import(
          `../features/plants/components/PlantsDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/plants/components/PlantDashboardSkeleton/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/plants/components/PlantsDataTable/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/plants/components/PlantsKpi/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/plants/components/Columns/messages/${locale}.json`
        )
      ).default,

      // Purchase Orders Feature
      ...(
        await import(
          `../features/purchase-orders/components/PurchaseOrdersDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/purchase-orders/components/PurchaseOrderSkeleton/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/purchase-orders/components/PurchaseOrderDataTable/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/purchase-orders/components/PurchaseOrdersKpi/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/purchase-orders/components/Columns/messages/${locale}.json`
        )
      ).default,

      // Users Feature
      ...(
        await import(
          `../features/users/components/UsersDashboard/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/users/components/UserDashboardSkeleton/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/users/components/UserDataTable/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/users/components/UserKpi/messages/${locale}.json`
        )
      ).default,
      ...(
        await import(
          `../features/users/components/Columns/messages/${locale}.json`
        )
      ).default,
    },
  };
});
