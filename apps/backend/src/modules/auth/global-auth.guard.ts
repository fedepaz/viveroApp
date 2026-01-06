// src/auth/global-auth.guard.ts

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Request } from 'express';
import { User } from '@prisma/client';
import { IS_PUBLIC_KEY } from '../../shared/decorators/public.decorator';

@Injectable()
export class GlobalAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    //for development purposes
    if (process.env.NODE_ENV === 'development') {
      return this.devAuthFallback(
        request as Request & { tenantId?: string; user?: User },
      );
    }

    //for production purposes
    return this.clerkAuth(request);
  }

  private devAuthFallback(request: Request): Promise<boolean> {
    //same logic devauthguard but integrated globally
    request['tenantId'] = '12345678-1234-1234-1234-123456789012';
    request['user'] = {
      userId: 'cmk1mgw6i0001j88x5kkx215h',
      email: 'dev@example.com',
      tenantId: '12345678-1234-1234-1234-123456789012',
      roles: ['admin'],
      clerkId: 'abc123',
    };

    return Promise.resolve(true);
  }

  private clerkAuth(_request: Request): Promise<boolean> {
    // TODO: Integrate with clerk and delete console.log
    console.log('clerkAuth request', _request);
    throw new ForbiddenException('Not implemented');
  }
}
