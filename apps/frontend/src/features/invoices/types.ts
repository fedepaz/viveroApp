interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  amount: number;
  status: "pending" | "paid" | "overdue";
  dueDate: string;
  createdDate: string;
}

export type { Invoice };
