import { Controller, Get, Query } from '@nestjs/common';

import { PublicRoute } from '@/auth/decorators/publicRoute.decorator';
import { CurrentUser } from '@/common/decorators/currentUser.decorator';

import { ExercisesService } from './exercises.service';

@Controller('exercises')
export class exercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  @PublicRoute()
  async findAllPublic(@Query('searchText') searchText: string) {
    return await this.exercisesService.findAllPublic(searchText);
  }

  @Get()
  async findAllPrivate(@CurrentUser('id') userId: string, @Query('searchText') searchText: string) {
    return await this.exercisesService.findAllPrivate(userId, searchText);
  }

  @Get()
  async findAllMine(@CurrentUser('id') userId: string) {
    return await this.exercisesService.findAllMine(userId);
  }
}
