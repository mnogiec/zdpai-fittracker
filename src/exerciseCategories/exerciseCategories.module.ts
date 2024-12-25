import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExerciseCategory } from '@/models/exerciseCategory.entity';

import { ExerciseCategoriesController } from './exerciseCategories.controller';
import { ExerciseCategoriesService } from './exerciseCategories.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseCategory])],
  controllers: [ExerciseCategoriesController],
  providers: [ExerciseCategoriesService],
  exports: [ExerciseCategoriesService],
})
export class ExerciseCategoriesModule {}
