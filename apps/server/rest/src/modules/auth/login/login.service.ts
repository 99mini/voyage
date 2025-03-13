import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { LoginEntity } from './entities';

import { LoginDto } from './dto';

@Injectable()
export class LoginService {
  constructor() {}

  // TODO: 로그인 로직 구현하기
  async login(loginDto: LoginDto): Promise<LoginEntity> {
    const { email, password } = loginDto;

    if (email === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD) {
      return {
        accessToken: 'test',
        refreshToken: 'test',
        accessTokenExpiresAt: new Date(Date.now() + 90 * 60 * 60 * 24 * 1000), // 90 day
        refreshTokenExpiresAt: new Date(Date.now() + 90 * 60 * 60 * 24 * 1000), // 90 day
        role: 'admin',
      };
    }

    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }
}
