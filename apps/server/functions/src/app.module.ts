import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { PocketBaseModule } from '@server/server-shared';

@Module({
  imports: [ConfigModule.forRoot(), WebhooksModule, PocketBaseModule],
})
export class AppModule {}