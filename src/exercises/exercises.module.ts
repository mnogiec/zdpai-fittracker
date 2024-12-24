import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExerciseCategoriesModule } from '@/exerciseCategories/exerciseCategories.module';
import { Exercise } from '@/models/exercise.entity';
import { UsersModule } from '@/users/users.module';

import { exercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise]), UsersModule, ExerciseCategoriesModule],
  controllers: [exercisesController],
  providers: [ExercisesService],
  exports: [ExercisesService],
})
export class ExercisesModule {}
