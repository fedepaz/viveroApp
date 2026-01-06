// src/modules/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly DEFAULT_ROLE_NAME = 'guest';
  constructor(private readonly userRepo: UserRepository) {}
  async findOrCreateUser(input: {
    tenantId: string;
    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
  }): Promise<User> {
    // check if user exists
    const existingUser = await this.userRepo.findByClerkId(input.clerkId);

    if (existingUser) {
      return existingUser;
    }

    // check tenant exists
    const tenant = await this.userRepo.findTenantById(input.tenantId);

    if (!tenant) {
      throw new Error('Tenant not found');
    }

    // get default role
    const role = await this.userRepo.findRoleByName(this.DEFAULT_ROLE_NAME);

    if (!role) {
      throw new Error('Role not found');
    }

    // create user
    return this.userRepo.createUser({
      clerkId: input.clerkId,
      email: input.email,
      firstName: input.firstName || 'Dev',
      lastName: input.lastName || 'User',
      tenantId: tenant.id,
      roleId: role.id,
    });
  }

  findById(id: string): Promise<User | null> {
    return this.userRepo.findById(id);
  }
}
