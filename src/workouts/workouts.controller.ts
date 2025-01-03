import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { CurrentUser } from '@/common/decorators/currentUser.decorator';
import { WorkoutDay } from '@/models/workoutDay.entity';
import { WorkoutExercise } from '@/models/workoutExercise.entity';

import { CreateWorkoutExerciseDto } from './dto/createWorkoutExercise.dto';
import { UpdateWorkoutExerciseDto } from './dto/updateWorkoutExercise.dto';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get()
  @ApiBearerAuth('JWT-auth')
  async findAll(@CurrentUser('id') userId: string): Promise<WorkoutDay[]> {
    return await this.workoutsService.findAll(userId);
  }

  @Post('exercise')
  @ApiBearerAuth('JWT-auth')
  async createExercise(@Body() createWorkoutExerciseDto: CreateWorkoutExerciseDto, @CurrentUser('id') userId: string): Promise<WorkoutExercise> {
    return await this.workoutsService.createExercise(createWorkoutExerciseDto, userId);
  }

  @Patch('exercise/:id')
  @ApiBearerAuth('JWT-auth')
  async updateExercise(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body() updateWorkoutExerciseDto: UpdateWorkoutExerciseDto,
  ): Promise<WorkoutExercise> {
    return await this.workoutsService.updateExercise(id, userId, updateWorkoutExerciseDto);
  }

  @Delete('exercise/:id')
  @ApiBearerAuth('JWT-auth')
  async deleteExercise(@Param('id') id: string, @CurrentUser('id') userId: string): Promise<DeleteResult> {
    return await this.workoutsService.deleteExercise(id, userId);
  }
}
