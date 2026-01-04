// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { DevAuthGuard } from './dev/dev.guard';
import { UserService } from './user/user.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [
    DevAuthGuard,
    // ClerkAuthGuard, // Uncomment to enable Clerk authentication
    UserService,
    PrismaService,
  ],
  exports: [
    DevAuthGuard,
    // ClerkAuthGuard, // Uncomment to enable Clerk authentication
    UserService,
  ],
})
export class AuthModule {}
