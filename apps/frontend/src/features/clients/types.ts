interface Client {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "prospect";
  totalOrders: number;
  totalRevenue: number;
  lastOrder: string;
}

interface CreateClientDto {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "prospect";
  totalOrders: number;
  totalRevenue: number;
  lastOrder: string;
}

interface UpdateClientDto {
  name?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  status?: "active" | "inactive" | "prospect";
  totalOrders?: number;
  totalRevenue?: number;
  lastOrder?: string;
}

export type { Client, CreateClientDto, UpdateClientDto };
