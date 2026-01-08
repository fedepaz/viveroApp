// app/modules/users/repositories/users.repository.ts

import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UpdateUserProfileDto } from '@vivero/shared';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  updateProfile(id: string, data: UpdateUserProfileDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
}
