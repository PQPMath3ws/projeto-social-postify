import { Injectable } from '@nestjs/common';
import { publications } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { PrismaService } from '../../database/prisma.service';

import { PublicationsRepository } from '../publications.repository';

@Injectable()
export class PublicationsPrismaRepository implements PublicationsRepository {
  constructor(private prismaService: PrismaService) {}

  async getMany(user_id: string): Promise<publications[]> {
    return await this.prismaService.publications.findMany({
      where: {
        user_id,
      },
    });
  }

  async getFirstWithTitle(title: string): Promise<publications> {
    return await this.prismaService.publications.findFirst({
      where: {
        title,
      },
    });
  }

  async createUserPost(
    image: string,
    title: string,
    text: string,
    dateToPublish: string,
    published: boolean,
    socialMedia: string,
    user_id: string,
  ): Promise<void> {
    await this.prismaService.publications.create({
      data: {
        id: uuidv4(),
        image,
        title,
        text,
        dateToPublish: new Date(dateToPublish),
        published,
        socialMedia,
        user_id,
      },
    });
  }
}
