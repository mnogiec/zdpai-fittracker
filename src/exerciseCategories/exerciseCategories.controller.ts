import { Controller, Get } from '@nestjs/common';

import { PublicRoute } from '@/auth/decorators/publicRoute.decorator';

import { ExerciseCategoriesService } from './exerciseCategories.service';

@Controller('exercise-categories')
export class exerciseCategoriesController {
  constructor(private readonly exerciseCategoriesService: ExerciseCategoriesService) {}

  @Get()
  @PublicRoute()
  async findAll() {
    return await this.exerciseCategoriesService.findAll();
  }
}
