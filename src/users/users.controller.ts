import { Controller, Get, Post, Body, NotFoundException } from '@nestjs/common';

import { PublicRoute } from '@/auth/decorators/publicRoute.decorator';
import { CurrentUser } from '@/common/decorators/currentUser.decorator';

import { RegisterDto } from './dto/register.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getMe(@CurrentUser('id') currentUserId: string) {
    const user = await this.usersService.findOneBy({ id: currentUserId }, { email: true });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post('register')
  @PublicRoute()
  async register(@Body() registerDto: RegisterDto) {
    return await this.usersService.register(registerDto);
  }
}
