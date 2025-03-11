import { Body, Controller, HttpStatus, Inject, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { Response } from 'express';

import { LoginService } from './login.service';

import { LoginDto } from './dto';
import { LoginEntity } from './entities';

@Controller('v1/auth/login')
export class LoginController {
  constructor(@Inject(LoginService) private readonly loginService: LoginService) {}

  @Post()
  @ApiOperation({ summary: 'Login', description: 'Login with email and password' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
      example: {
        email: 'admin@localhost',
        password: 'password',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successful',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
        },
        refreshToken: {
          type: 'string',
        },
        accessTokenExpiresAt: {
          type: 'string',
          format: 'date',
        },
        refreshTokenExpiresAt: {
          type: 'string',
          format: 'date',
        },
        role: {
          type: 'string',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async login(
    @Res() res: Response,
    @Body() loginDto: LoginDto,
  ): Promise<
    Response<{
      status: HttpStatus;
      message: string;
      data: LoginEntity;
    }>
  > {
    const { accessToken, refreshToken, accessTokenExpiresAt, refreshTokenExpiresAt } =
      await this.loginService.login(loginDto);

    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'success',
      data: {
        accessToken,
        refreshToken,
        accessTokenExpiresAt,
        refreshTokenExpiresAt,
      },
    });
  }
}
