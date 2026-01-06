// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { GlobalAuthGuard } from './global-auth.guard';

@Module({
  providers: [GlobalAuthGuard, UserService, PrismaService],
  exports: [GlobalAuthGuard, UserService],
})
export class AuthModule {}
