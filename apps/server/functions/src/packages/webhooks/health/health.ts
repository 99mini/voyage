import { healthCheck } from '@functions/webhooks/health';

export function main(event: any, context: any) {
  return {
    status: 200,
    data: healthCheck(),
  };
}
