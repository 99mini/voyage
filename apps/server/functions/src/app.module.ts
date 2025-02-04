import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebhooksModule } from './modules/webhooks/webhooks.module';

@Module({
  imports: [ConfigModule.forRoot(), WebhooksModule],
})

export class AppModule {}