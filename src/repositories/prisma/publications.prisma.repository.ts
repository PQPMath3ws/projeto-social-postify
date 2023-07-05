import { Injectable } from '@nestjs/common';
import { publications } from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';

import { PublicationsRepository } from '../publications.repository';

@Injectable()
export class PublicationsPrismaRepository implements PublicationsRepository {
  constructor(private prismaService: PrismaService) {}

  async get(user_id: string): Promise<publications[]> {
    return await this.prismaService.publications.findMany({
      where: {
        user_id,
      },
    });
  }
}
