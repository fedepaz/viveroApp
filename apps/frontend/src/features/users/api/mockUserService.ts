//src/features/users/api/mockUserService.ts

import { User, CreateUserDto, UpdateUserDto } from "../types";

const generateUsers = (count: number): User[] => {
  const roles: User["role"][] = ["admin", "manager", "worker"];
  const statuses: User["status"][] = ["active", "inactive"];
  const departments = [
    "Greenhouse A",
    "Greenhouse B",
    "Processing",
    "Quality Control",
    "Administration",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@agricultural.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    department: departments[Math.floor(Math.random() * departments.length)],
  }));
};
// Replace with your actual API call
// For example, you could fetch users from a database or an API endpoint
// For now we'll just generate some mock data

export const mockUserService = {
  async fetchUsers(): Promise<User[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000)); // Replace API response with users
    // Simulate receiving users from the API
    return generateUsers(150);
  },

  async fetchUserById(id: string): Promise<User | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Replace API response with user
    // Simulate receiving user from the API
    const users = generateUsers(150);
    return users.find((user) => user.id === id) || null;
  },

  async createUser(userCreate: CreateUserDto): Promise<User> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Replace API response with user
    // Simulate creating user in the database
    return {
      ...userCreate,
      id: `user-${Date.now()}`,
    };
  },

  async updateUser(id: string, userUpdate: UpdateUserDto): Promise<User> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Replace API response with user
    // Simulate updating user in the database
    const users = generateUsers(150);
    const existingUser = users.find((user) => user.id === id);
    if (!existingUser) throw new Error("User not found");
    return { ...existingUser, ...userUpdate };
  },

  //async deleteUser(id: string): Promise<void> {
  //  // Simulate network delay
  //  await new Promise((resolve) => setTimeout(resolve, 1500));
  //  // Replace API response with user
  //  // Simulate deleting user from the database
  //},
};
