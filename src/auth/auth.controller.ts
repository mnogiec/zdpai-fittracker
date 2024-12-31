import { Controller, HttpCode, HttpStatus, Post, Request as Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { PublicRoute } from './decorators/publicRoute.decorator';
import { LoginDto } from './dto/LoginDto.dto';
import { LocalAuthGuard } from './guards/localAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @PublicRoute()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {
        example: {
          access_token: 'string',
          user: {
            id: 'string',
            email: 'string@test.com',
            firstName: 'string',
            lastName: 'string',
            isAdmin: false,
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    content: {
      'application/json': {
        example: {
          statusCode: 401,
          message: 'Invalid email or password',
          error: 'UnauthorizedException',
        },
      },
    },
  })
  async login(@Req() req: Request) {
    return await this.authService.login(req.user);
  }
}
