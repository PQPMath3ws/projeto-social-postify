import { Module } from '@nestjs/common';

import { AuthenticationModule } from './authentication.module';
import { UsersModule } from './users.module';

@Module({
  imports: [AuthenticationModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
