import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExerciseCategory } from '@/models/exerciseCategory.entity';

import { exerciseCategoriesController } from './exerciseCategories.controller';
import { ExerciseCategoriesService } from './exerciseCategories.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseCategory])],
  controllers: [exerciseCategoriesController],
  providers: [ExerciseCategoriesService],
  exports: [ExerciseCategoriesService],
})
export class ExerciseCategoriesModule {}
