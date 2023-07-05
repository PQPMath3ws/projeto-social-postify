import { Module } from '@nestjs/common';

import { AuthenticationModule } from './authentication.module';
import { PublicationsModule } from './publications.module';
import { UsersModule } from './users.module';

@Module({
  imports: [AuthenticationModule, PublicationsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
