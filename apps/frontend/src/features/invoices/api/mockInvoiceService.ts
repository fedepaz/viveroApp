//src/features/invoices/api/mockInvoiceService.ts
"server-only";

import { CreateInvoiceDto, Invoice, UpdateInvoiceDto } from "../types";

const generateInvoices = (count: number): Invoice[] => {
  const statuses: Invoice["status"][] = ["pending", "paid", "overdue"];
  const clients = [
    "Green Valley Farms",
    "Organic Produce Co",
    "Fresh Market Ltd",
    "Healthy Foods Inc",
    "Farm Fresh Direct",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `invoice-${i + 1}`,
    invoiceNumber: `INV-${String(i + 1).padStart(4, "0")}`,
    client: clients[Math.floor(Math.random() * clients.length)],
    amount: Math.round((Math.random() * 10000 + 500) * 100) / 100,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    dueDate: new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    createdDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  }));
};
// Replace with your actual API call
// For example, you could fetch invoices from a database or an API endpoint
// For now we'll just generate some mock data

export const mockInvoiceService = {
  async fetchInvoices(): Promise<Invoice[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000)); // Replace API response with invoices
    // Simulate receiving invoices from the API
    return generateInvoices(500);
  },

  async fetchInvoiceById(id: string): Promise<Invoice | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Replace API response with invoice
    // Simulate receiving invoice from the API
    const invoices = generateInvoices(500);
    return invoices.find((invoice) => invoice.id === id) || null;
  },

  async createInvoice(invoiceCreate: CreateInvoiceDto): Promise<Invoice> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Replace API response with invoice
    // Simulate creating invoice in the database
    return {
      ...invoiceCreate,
      id: `invoice-${Date.now()}`,
    };
  },

  async updateInvoice(
    id: string,
    invoiceUpdate: UpdateInvoiceDto
  ): Promise<Invoice> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Replace API response with invoice
    // Simulate updating invoice in the database
    const invoices = generateInvoices(500);
    const existingInvoice = invoices.find((invoice) => invoice.id === id);
    if (!existingInvoice) throw new Error("Invoice not found");
    return { ...existingInvoice, ...invoiceUpdate };
  },

  //async deleteInvoice(id: string): Promise<void> {
  //  // Simulate network delay
  //  await new Promise((resolve) => setTimeout(resolve, 1500));
  //  // Replace API response with invoice
  //  // Simulate deleting invoice from the database
  //},
};
