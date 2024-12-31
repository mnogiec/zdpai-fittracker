import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { ExercisesService } from '@/exercises/exercises.service';
import { WorkoutDay } from '@/models/workoutDay.entity';
import { WorkoutExercise } from '@/models/workoutExercise.entity';

import { CreateWorkoutExerciseDto } from './dto/createWorkoutExercise.dto';
import { UpdateWorkoutExerciseDto } from './dto/updateWorkoutExercise.dto';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(WorkoutDay)
    private readonly workoutDaysRepository: Repository<WorkoutDay>,
    @InjectRepository(WorkoutExercise)
    private readonly workoutExercisesRepository: Repository<WorkoutExercise>,
    private readonly exercisesService: ExercisesService,
  ) {}

  async findDayBy(where: FindOptionsWhere<WorkoutDay>): Promise<WorkoutDay | null> {
    return await this.workoutDaysRepository.findOne({ where, relations: { workoutExercises: true } });
  }

  async findExerciseBy(where: FindOptionsWhere<WorkoutExercise>): Promise<WorkoutExercise | null> {
    return await this.workoutExercisesRepository.findOne({ where, relations: { workoutDay: true } });
  }

  async findAll(userId: string): Promise<WorkoutDay[]> {
    return await this.workoutDaysRepository.find({
      where: { user: { id: userId } },
      relations: {
        workoutExercises: {
          exercise: true,
        },
      },
    });
  }

  @Transactional()
  async createExercise(createWorkoutExerciseDto: CreateWorkoutExerciseDto, userId: string): Promise<WorkoutExercise> {
    const exercise = await this.exercisesService.findOneBy({ id: createWorkoutExerciseDto.exerciseId });
    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    if (createWorkoutExerciseDto.workoutDayId) {
      const workoutDay = await this.findDayBy({ id: createWorkoutExerciseDto.workoutDayId });
      if (!workoutDay) {
        throw new NotFoundException('Workout day not found');
      }
      return await this.workoutExercisesRepository.save({ ...createWorkoutExerciseDto, workoutDay, exercise });
    }

    const workoutDay = await this.workoutDaysRepository.save({ user: { id: userId }, date: new Date() });
    return await this.workoutExercisesRepository.save({ ...createWorkoutExerciseDto, workoutDay, exercise });
  }

  async updateExercise(id: string, userId: string, updateWorkoutExerciseDto: UpdateWorkoutExerciseDto): Promise<WorkoutExercise> {
    const workoutExercise = await this.findExerciseBy({ id });
    if (!workoutExercise) {
      throw new NotFoundException('Workout exercise not found');
    }

    if (!(await this.canManageWorkoutExercise(userId, id))) {
      throw new ForbiddenException('You are not allowed to manage this workout exercise');
    }

    return await this.workoutExercisesRepository.save({ ...workoutExercise, ...updateWorkoutExerciseDto });
  }

  @Transactional()
  async deleteExercise(id: string, userId: string): Promise<DeleteResult> {
    const workoutExercise = await this.findExerciseBy({ id });

    if (!workoutExercise) {
      throw new NotFoundException('Workout exercise not found');
    }

    if (!(await this.canManageWorkoutExercise(userId, id))) {
      throw new ForbiddenException('You are not allowed to manage this workout exercise');
    }

    const result = await this.workoutExercisesRepository.delete(id);

    const workoutDay = await this.workoutDaysRepository.findOne({ where: { id: workoutExercise.workoutDay.id }, relations: { workoutExercises: true } });

    if (workoutDay.workoutExercises.length === 0) {
      await this.workoutDaysRepository.delete(workoutDay.id);
    }

    return result;
  }

  private async canManageWorkoutExercise(userId: string, workoutExerciseId: string): Promise<boolean> {
    const workoutExercise = await this.workoutExercisesRepository.findOne({
      where: { id: workoutExerciseId },
      relations: {
        workoutDay: {
          user: true,
        },
      },
    });

    if (!workoutExercise) {
      throw new NotFoundException('Workout exercise not found');
    }

    return workoutExercise.workoutDay.user.id === userId;
  }
}
