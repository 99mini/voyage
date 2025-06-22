import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

const validApiKey = process.env.API_KEY;
@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey || apiKey !== validApiKey) {
      throw new ForbiddenException('Invalid API key');
    }

    return true;
  }
}
