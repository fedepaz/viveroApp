// src/auth/user/user.service.ts

import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly DEFAULT_ROLE_NAME = 'admin';
  constructor(private prisma: PrismaService) {}
  async findOrCreateUser(input: {
    clerkId: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<User> {
    // check if user exists
    const user = await this.prisma.user.findUnique({
      where: {
        clerkId: input.clerkId,
      },
    });

    if (user) {
      return user;
    }

    // check tenant exists
    const tenant = await this.prisma.tenant.findUnique({
      where: {
        id: input.clerkId,
      },
    });

    if (!tenant) {
      throw new Error('Tenant not found');
    }

    // get default role
    const role = await this.prisma.role.findUnique({
      where: {
        name: this.DEFAULT_ROLE_NAME,
      },
    });

    if (!role) {
      throw new Error('Role not found');
    }

    // create user
    return this.prisma.user.create({
      data: {
        clerkId: input.clerkId,
        email: input.email,
        firstName: input.firstName || 'Dev',
        lastName: input.lastName || 'User',
        isActive: true,
        tenantId: tenant.id,
        roleId: role.id,
      },
    });
  }
  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
