import { Controller, Get } from '@nestjs/common';

import { PublicRoute } from '@/auth/decorators/publicRoute.decorator';
import { ExerciseCategory } from '@/models/exerciseCategory.entity';

import { ExerciseCategoriesService } from './exerciseCategories.service';

@Controller('exercise-categories')
export class ExerciseCategoriesController {
  constructor(private readonly exerciseCategoriesService: ExerciseCategoriesService) {}

  @Get()
  @PublicRoute()
  async findAll(): Promise<ExerciseCategory[]> {
    return await this.exerciseCategoriesService.findAll();
  }
}
