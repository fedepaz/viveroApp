interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "worker";
  status: "active" | "inactive";
  lastLogin: string;
  department: string;
}

interface CreateUserDto {
  name: string;
  email: string;
  role: "admin" | "manager" | "worker";
  status: "active" | "inactive";
  lastLogin: string;
  department: string;
}

interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: "admin" | "manager" | "worker";
  status?: "active" | "inactive";
  lastLogin?: string;
  department?: string;
}

export type { User, CreateUserDto, UpdateUserDto };
