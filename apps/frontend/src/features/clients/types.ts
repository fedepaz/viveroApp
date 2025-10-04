import { z } from "zod";

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
}

interface UpdateClientDto {
  name?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  status?: "active" | "inactive" | "prospect";
}

const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone number is required"),
  status: z.enum(["active", "inactive", "prospect"]),
});

type ClientFormData = z.infer<typeof clientSchema>;

export type { Client, CreateClientDto, UpdateClientDto, ClientFormData };
export { clientSchema };
