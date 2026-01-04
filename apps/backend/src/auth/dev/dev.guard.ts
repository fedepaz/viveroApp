// src/auth/dev/dev.guard.ts

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Request } from 'express';

@Injectable()
export class DevAuthGuard implements CanActivate {
  private readonly logger = new Logger(DevAuthGuard.name);
  private readonly DEV_USER_EMAIL = 'dev@example.com';
  private readonly DEV_USER_PASSWORD = 'dev';
  private readonly DEV_TENANT_ID = '12345678-1234-1234-1234-123456789012';
  private readonly DEV_ClERK_ID = 'abc123';

  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const handler = context.getHandler();
    const controller = context.getClass();

    try {
      this.logAccessAttempt(request, controller, handler);
      // set tenant to context( CRITICAL FOR DATA ISOLATION )
      request['tenant'] = this.DEV_TENANT_ID;

      // find or create user
      const user = await this.userService.findOrCreateUser({
        clerkId: this.DEV_ClERK_ID,
        email: this.DEV_USER_EMAIL,
        password: this.DEV_USER_PASSWORD,
        firstName: 'Dev',
        lastName: 'User',
      });

      // set user to context
      request['user'] = {
        userId: user.id,
        email: user.email,
        tenantId: this.DEV_TENANT_ID,
        roles: ['admin'],
        clerkId: this.DEV_ClERK_ID,
      };

      this.logger.log(
        `✅ AUTH SUCCESS | IP: ${this.getClientIp(request)} | ` +
          `User: ${user.email} | ` +
          `Endpoint: ${request.method} ${request.url}`,
      );

      return true;
    } catch (error) {
      this.logAuthFailure(request, error);
      if (error instanceof Error) {
        throw new ForbiddenException({
          message: ' Authentication failed for development environment',
          timestamp: new Date().toISOString(),
          path: request.url,
          debug:
            process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
      }
      return false;
    }
  }

  private logAccessAttempt(
    request: Request,
    controller: any,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    handler: Function,
  ) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const controllerName = controller.name || 'UnknownController';
      const handlerName = handler.name || 'UnknownHandler';

      this.logger.debug(
        `🔍 ACCESS ATTEMPT | IP: ${this.getClientIp(request)} | ` +
          `Controller: ${controllerName} | ` +
          `Handler: ${handlerName} | ` +
          `Method: ${request.method} ${request.url}`,
      );
    }
  }
  private logAuthFailure(request: Request, error: unknown) {
    // 🚨 SECURITY LOGGING - ALWAYS LOG FAILURES
    const logMessage =
      `🚨 AUTH FAILURE | IP: ${this.getClientIp(request)} | ` +
      `Endpoint: ${request.method} ${request.url} | ` +
      `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;

    // In production, use a dedicated security logger
    if (process.env.NODE_ENV === 'production') {
      this.logger.error(logMessage);
      // TODO: Send to security monitoring system (Datadog/Sentry)
    } else {
      this.logger.warn(logMessage);
    }
  }

  private getClientIp(request: Request): string {
    // Get real client IP in development
    return (
      request.headers['x-forwarded-for']?.toString().split(',')[0] ||
      request.socket.remoteAddress ||
      'unknown'
    );
  }
}
