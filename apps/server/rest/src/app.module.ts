import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { FilesModule } from './modules/files/files.module';
import { FindVideoModule } from './modules/find-video/find-video.module';
import { HealthModule } from './modules/health/health.module';
import { InternalModule } from './modules/internal/internal.module';
import { MeModule } from './modules/me/me.module';

import { CommonModule } from './common/common.module';
import { PrismaModule } from './prisma/prisma.module';
import { SupabaseModule } from './supabase/supabase.module';
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
    InternalModule,
    FindVideoModule,
    PrismaModule,
    SupabaseModule,
  ],
})
export class AppModule {}
