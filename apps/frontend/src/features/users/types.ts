export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "worker";
  status: "active" | "inactive";
  lastLogin: string;
  department: string;
}
