import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { FilesModule } from './modules/files/files.module';
import { HealthModule } from './modules/health/health.module';
import { MeModule } from './modules/me/me.module';

import { CommonModule } from './common/common.module';
import { WebhooksModule } from './webhooks/webhooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
    }),
    CommonModule,
    AuthModule,
    HealthModule,
    FilesModule,
    WebhooksModule,
    MeModule,
  ],
})
export class AppModule {}
