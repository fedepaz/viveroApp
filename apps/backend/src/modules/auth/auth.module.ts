// src/auth/auth.module.ts

import { Module, Provider } from '@nestjs/common';
import { GlobalAuthGuard } from './guards/global-auth.guard';
import { AuthService } from './auth.service';
import { UserRepository } from './repositories/user.repository';
import { AuthStrategy } from './interfaces/auth-strategy.abstract';
import { DevAuthStrategy } from './strategies/dev-auth.strategy';
import { ClerkAuthStrategy } from './strategies/clerk-auth.strategy';

// Factory provider to select the correct strategy based on the environment
const authStrategyProvider: Provider<AuthStrategy> = {
  provide: AuthStrategy,
  useFactory: (
    devStrategy: DevAuthStrategy,
    clerkStrategy: ClerkAuthStrategy,
  ) => {
    if (process.env.NODE_ENV === 'development') {
      return devStrategy;
    }
    return clerkStrategy;
  },
  inject: [DevAuthStrategy, ClerkAuthStrategy],
};

@Module({
  providers: [
    GlobalAuthGuard,
    AuthService,
    UserRepository,
    authStrategyProvider,
    DevAuthStrategy,
    ClerkAuthStrategy,
  ],

  exports: [GlobalAuthGuard, AuthService, AuthStrategy],
})
export class AuthModule {}
