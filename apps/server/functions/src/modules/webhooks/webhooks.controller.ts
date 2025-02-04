import { Controller, Post, Body } from '@nestjs/common';

@Controller('webhooks')
export class WebhooksController {
  @Post()
  handleWebhook(@Body() data: any) {
    console.log('Received webhook:', data);
    return { message: 'Webhook received' };
  }
}