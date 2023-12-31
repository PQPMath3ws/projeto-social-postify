import { Injectable } from '@nestjs/common';
import { sessions } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from '../../database/prisma.service';

import { AuthenticationRepository } from '../authentication.repository';

@Injectable()
export class AuthenticationPrismaRepository
  implements AuthenticationRepository
{
  constructor(private prisma: PrismaService) {}

  async create(token: string, user_id: string, expiresAt: Date): Promise<void> {
    await this.prisma.sessions.create({
      data: {
        id: uuidv4(),
        token,
        user_id,
        expiresAt,
      },
    });
  }

  async get(token: string): Promise<sessions> {
    return await this.prisma.sessions.findFirst({
      where: {
        token: token,
      },
    });
  }
}
