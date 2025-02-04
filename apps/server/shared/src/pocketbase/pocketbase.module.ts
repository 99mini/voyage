import { Module } from '@nestjs/common';
import PocketBase from 'pocketbase';

@Module({
  providers: [
    {
      provide: 'POCKETBASE_CLIENT',
      useValue: new PocketBase(process.env.PB_URL),
    },
  ],
  exports: ['POCKETBASE_CLIENT'],
})
export class PocketBaseModule {}