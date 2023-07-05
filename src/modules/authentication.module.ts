import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthenticationController } from '../controllers/authentication.controller';

import { PrismaService } from '../database/prisma.service';

import { AuthenticationPrismaRepository } from '../repositories/prisma/authentication.prisma.repository';
import { UsersPrismaRepository } from '../repositories/prisma/users.prisma.repository';

import { AuthenticationRepository } from '../repositories/authentication.repository';
import { UsersRepository } from '../repositories/users.repository';

import { AuthenticationService } from '../services/authentication.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        signOptions: { expiresIn: '2d' },
        secret: process.env.JWT_SECRET_KEY,
      }),
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AuthenticationController],
  providers: [
    PrismaService,
    {
      provide: AuthenticationRepository,
      useClass: AuthenticationPrismaRepository,
    },
    {
      provide: UsersRepository,
      useClass: UsersPrismaRepository,
    },
    AuthenticationService,
  ],
})
export class AuthenticationModule {}
