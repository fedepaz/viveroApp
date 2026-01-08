// src/auth/strategies/clerk-auth.strategy.ts

import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { AuthStrategy } from '../interfaces/auth-strategy.abstract';
import { Request } from 'express';

@Injectable()
export class ClerkAuthStrategy implements AuthStrategy {
  private readonly logger = new Logger(ClerkAuthStrategy.name);

  getName(): string {
    return 'ClerkAuthStrategy';
  }

  async authenticate(request: Request): Promise<boolean> {
    // TODO: Integrate with clerk and delete console.log
    await Promise.resolve(); // No-op that makes method truly async
    this.logger.log('clerkAuth request', request.hostname);
    throw new ForbiddenException('Not implemented yet');
  }
}
