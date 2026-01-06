// src/auth/strategies/dev-auth.strategy.ts

import { Injectable, Logger } from '@nestjs/common';
import { AuthStrategy } from '../interfaces/auth-strategy.abstract';
import { Request } from 'express';
import { User } from '@prisma/client';

@Injectable()
export class DevAuthStrategy implements AuthStrategy {
  private readonly logger = new Logger(DevAuthStrategy.name);

  getName(): string {
    return 'DevAuthStrategy';
  }

  async authenticate(
    request: Request & { tenantId?: string; user?: User },
  ): Promise<boolean> {
    try {
      // Add a microtask to satisfy linting (and prepare for real async ops)
      await Promise.resolve(); // No-op that makes method truly async

      // Same logic devauthguard but integrated globally
      request.tenantId = '12345678-1234-1234-1234-123456789012';
      request.user = {
        id: 'cmk1mgw6i0001j88x5kkx215h',
        email: 'dev@example.com',
        tenantId: '12345678-1234-1234-1234-123456789012',
        clerkId: 'abc123',
        roleId: 'cmk1lzh3y0000j8l5ojy2xon2',
        firstName: 'Dev',
        lastName: 'User',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.logger.log('✅ DEV AUTH SUCCESS | Hardcoded user authenticated');
      return true;
    } catch (error) {
      this.logger.error(
        '❌ DEV AUTH FAILED',
        error instanceof Error ? error.message : 'Unknown error',
      );
      return false;
    }
  }
}
