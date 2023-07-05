import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthenticationController } from '../controllers/authentication.controller';
import { UsersController } from '../controllers/users.controller';

import { PrismaService } from '../database/prisma.service';

import { AuthenticationRepository } from '../repositories/authentication.repository';
import { UsersRepository } from '../repositories/users.repository';

import { AuthenticationPrismaRepository } from '../repositories/prisma/authentication.prisma.repository';
import { UsersPrismaRepository } from '../repositories/prisma/users.prisma.repository';

import { AuthenticationService } from '../services/authentication.service';
import { UsersService } from '../services/users.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        signOptions: { expiresIn: '2d' },
        secret: process.env.JWT_SECRET_KEY,
      }),
    }),
  ],
  controllers: [UsersController, AuthenticationController],
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: UsersPrismaRepository,
    },
    {
      provide: AuthenticationRepository,
      useClass: AuthenticationPrismaRepository,
    },
    UsersService,
    AuthenticationService,
  ],
})
@Module({
  imports: [ConfigModule.forRoot()],
})
export class AppModule {}
