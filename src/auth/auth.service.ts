import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '@/models/user.entity';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneWithPassword(email?.trim()?.toLowerCase());

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async validateUserToken(token: string): Promise<User | null> {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.usersService.findOneBy({ id: decoded.id }, { email: true });
      return user;
    } catch {
      return null;
    }
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      id: user.id,
      email: user.email?.trim()?.toLowerCase(),
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: await this.usersService.findOneBy({ id: user.id }, { email: true }),
    };
  }
}
