// app/modules/users/users.controller.ts

import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserProfileDto, UpdateUserProfileSchema } from '@vivero/shared';
import { ZodValidationPipe } from '../../shared/pipes/zod-validation-pipe';
import { User } from '@prisma/client';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: User;
}

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('me')
  getMe(@Req() req: AuthenticatedRequest) {
    return this.service.getProfile(req.user.id);
  }

  @Patch('me')
  updateMe(
    @Req() req: AuthenticatedRequest,
    @Body(new ZodValidationPipe(UpdateUserProfileSchema))
    body: UpdateUserProfileDto,
  ) {
    return this.service.updateProfile(req.user.id, body);
  }
}
