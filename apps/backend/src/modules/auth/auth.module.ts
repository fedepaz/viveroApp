// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { GlobalAuthGuard } from './guards/global-auth.guard';
import { AuthService } from './auth.service';
import { UserRepository } from './repositories/user.repository';

@Module({
  providers: [GlobalAuthGuard, AuthService, UserRepository],
  exports: [GlobalAuthGuard, AuthService],
})
export class AuthModule {}
