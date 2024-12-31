import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { PublicRoute } from '@/auth/decorators/publicRoute.decorator';
import { ExerciseCategory } from '@/models/exerciseCategory.entity';

import { ExerciseCategoriesService } from './exerciseCategories.service';

@Controller('exercise-categories')
export class ExerciseCategoriesController {
  constructor(private readonly exerciseCategoriesService: ExerciseCategoriesService) {}

  @Get()
  @PublicRoute()
  @ApiResponse({
    status: 200,
    description: 'Success',
    content: {
      'application/json': {
        example: [
          {
            id: 1,
            name: 'string',
          },
        ],
      },
    },
  })
  async findAll(): Promise<ExerciseCategory[]> {
    return await this.exerciseCategoriesService.findAll();
  }
}
