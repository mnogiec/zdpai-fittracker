import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';

import { PublicRoute } from '@/auth/decorators/publicRoute.decorator';
import { CurrentUser } from '@/common/decorators/currentUser.decorator';
import { Exercise } from '@/models/exercise.entity';

import { CreateExerciseDto } from './dto/CreateExerciseDto.dto';
import { UpdateExerciseDto } from './dto/UpdateExerciseDto.dto';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get('public')
  @PublicRoute()
  async findAllPublic(@Query('searchText') searchText: string): Promise<Record<string, Exercise[]>> {
    return await this.exercisesService.findAllPublic(searchText);
  }

  @Get('private')
  async findAllPrivate(@CurrentUser('id') userId: string, @Query('searchText') searchText: string): Promise<Record<string, Exercise[]>> {
    return await this.exercisesService.findAllPrivate(userId, searchText);
  }

  @Get()
  async findAllMine(@CurrentUser('id') userId: string): Promise<Record<string, Exercise[]>> {
    return await this.exercisesService.findAllMine(userId);
  }

  @Post()
  async create(@CurrentUser('id') userId: string, @Body() createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    return await this.exercisesService.create(userId, createExerciseDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @CurrentUser('id') userId: string, @Body() updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
    return await this.exercisesService.update(id, userId, updateExerciseDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser('id') userId: string): Promise<HttpStatus> {
    await this.exercisesService.delete(id, userId);
    return HttpStatus.OK;
  }
}
