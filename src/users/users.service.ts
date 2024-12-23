import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { FindOptionsSelect, QueryFailedError, Repository } from 'typeorm';

import { User } from '@/models/user.entity';
import { POSTGRES_UNIQUE_VIOLATION_CODE } from '@/utils/postgresql';

import { RegisterDto } from './dto/register.dto';

const HASH_SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOneBy(field: object, select?: FindOptionsSelect<User>): Promise<User | null> {
    const defaultSelect: FindOptionsSelect<User> = {
      id: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      updatedAt: true,
      isAdmin: true,
    };

    return await this.usersRepository.findOne({ where: field, select: { ...defaultSelect, ...select } });
  }

  async findOneWithPassword(email: string): Promise<User | null> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', {
        email,
      })
      .getOne();
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const { password, ...generalRegisterDto } = registerDto;

    const hashedPassword = await bcrypt.hash(password, HASH_SALT_ROUNDS);

    let user: User;

    try {
      user = await this.usersRepository.save({
        password: hashedPassword,
        ...generalRegisterDto,
      });
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError?.code === POSTGRES_UNIQUE_VIOLATION_CODE) {
        throw new BadRequestException('Email is already used');
      }

      throw error;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...permittedUser } = user;

    return permittedUser as User;
  }
}
