import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';

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
  @ApiParam({ name: 'searchText', required: false, description: 'Search text' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    content: {
      'application/json': {
        example: {
          Back: [
            {
              id: 'e5ea49d6-cc6a-4ad9-8b75-00796d394c58',
              createdAt: '2024-12-30T08:47:48.686Z',
              updatedAt: '2024-12-30T08:47:48.686Z',
              name: 'T-Bar Row',
              description: 'Compound exercise for mid to upper back development.',
              videoUrl: 'https://www.youtube.com/watch?v=yPis7nlbqdY',
              imageUrl: 'https://images.ctfassets.net/8urtyqugdt2l/5pziwWANOaPjQS2caLU8vd/83764919b6f35d9b053dd33bcb591fc9/t-bar-row-thumbnail.jpg',
              isPrivate: false,
              category: {
                id: 4,
                name: 'Back',
              },
            },
          ],
        },
      },
    },
  })
  async findAllPublic(@Query('searchText') searchText: string): Promise<Record<string, Exercise[]>> {
    return await this.exercisesService.findAllPublic(searchText);
  }

  @Get('private')
  @ApiBearerAuth('JWT-auth')
  @ApiParam({ name: 'searchText', required: false, description: 'Search text' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    content: {
      'application/json': {
        example: {
          Back: [
            {
              id: 'e5ea49d6-cc6a-4ad9-8b75-00796d394c58',
              createdAt: '2024-12-30T08:47:48.686Z',
              updatedAt: '2024-12-30T08:47:48.686Z',
              name: 'T-Bar Row',
              description: 'Compound exercise for mid to upper back development.',
              videoUrl: 'https://www.youtube.com/watch?v=yPis7nlbqdY',
              imageUrl: 'https://images.ctfassets.net/8urtyqugdt2l/5pziwWANOaPjQS2caLU8vd/83764919b6f35d9b053dd33bcb591fc9/t-bar-row-thumbnail.jpg',
              isPrivate: false,
              category: {
                id: 4,
                name: 'Back',
              },
            },
          ],
        },
      },
    },
  })
  async findAllPrivate(@CurrentUser('id') userId: string, @Query('searchText') searchText: string): Promise<Record<string, Exercise[]>> {
    return await this.exercisesService.findAllPrivate(userId, searchText);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({
    status: 200,
    type: Exercise,
    isArray: true,
  })
  async findAllMine(@CurrentUser('id') userId: string): Promise<Record<string, Exercise[]>> {
    return await this.exercisesService.findAllMine(userId);
  }

  @Post()
  @ApiBearerAuth('JWT-auth')
  async create(@CurrentUser('id') userId: string, @Body() createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    return await this.exercisesService.create(userId, createExerciseDto);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  async update(@Param('id') id: string, @CurrentUser('id') userId: string, @Body() updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
    return await this.exercisesService.update(id, userId, updateExerciseDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  async delete(@Param('id') id: string, @CurrentUser('id') userId: string): Promise<HttpStatus> {
    await this.exercisesService.delete(id, userId);
    return HttpStatus.OK;
  }
}
