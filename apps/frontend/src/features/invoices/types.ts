//src/features/invoices/types.ts

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  amount: number;
  status: "pending" | "paid" | "overdue";
  dueDate: string;
  createdDate: string;
}

interface CreateInvoiceDto {
  invoiceNumber: string;
  client: string;
  amount: number;
  status: Invoice["status"];
  dueDate: string;
  createdDate: string;
}
interface UpdateInvoiceDto {
  invoiceNumber?: string;
  client?: string;
  amount?: number;
  status?: Invoice["status"];
  dueDate?: string;
  createdDate?: string;
}

export type { Invoice, CreateInvoiceDto, UpdateInvoiceDto };
