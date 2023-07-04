import { Module } from '@nestjs/common';

import { UsersController } from '../controllers/users.controller';

import { PrismaService } from '../database/prisma.service';

import { UsersService } from '../services/users.service';

import { UsersRepository } from '../repositories/users.repository';
import { UsersPrismaRepository } from '../repositories/prisma/users.prisma.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: UsersPrismaRepository,
    },
    UsersService,
  ],
})
export class AppModule {}
