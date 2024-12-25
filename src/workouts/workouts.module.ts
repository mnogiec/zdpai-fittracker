import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExercisesModule } from '@/exercises/exercises.module';
import { WorkoutDay } from '@/models/workoutDay.entity';
import { WorkoutExercise } from '@/models/workoutExercise.entity';

import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
@Module({
  imports: [TypeOrmModule.forFeature([WorkoutDay, WorkoutExercise]), ExercisesModule],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  exports: [WorkoutsService],
})
export class WorkoutsModule {}
