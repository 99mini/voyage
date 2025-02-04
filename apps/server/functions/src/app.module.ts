import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { ReportsModule } from './modules/reports/reports.module';
import { PocketBaseModule } from './modules/pocketbase/pocketbase.module';

@Module({
  imports: [ConfigModule.forRoot(), WebhooksModule, ReportsModule, PocketBaseModule],
})
export class AppModule {}