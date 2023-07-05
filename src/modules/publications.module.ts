import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

import { PublicationsController } from '../controllers/publications.controller';

import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';

import { AuthenticationPrismaRepository } from '../repositories/prisma/authentication.prisma.repository';
import { PublicationsPrismaRepository } from '../repositories/prisma/publications.prisma.repository';

import { AuthenticationRepository } from '../repositories/authentication.repository';
import { PublicationsRepository } from '../repositories/publications.repository';

import { PublicationsService } from '../services/publications.service';

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
  controllers: [PublicationsController],
  providers: [
    PrismaService,
    {
      provide: AuthenticationRepository,
      useClass: AuthenticationPrismaRepository,
    },
    PublicationsService,
    {
      provide: PublicationsRepository,
      useClass: PublicationsPrismaRepository,
    },
  ],
})
export class PublicationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes('publication', 'publications');
  }
}
