import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOptionsWhere, ILike, Repository } from 'typeorm';

import { ExerciseCategoriesService } from '@/exerciseCategories/exerciseCategories.service';
import { Exercise } from '@/models/exercise.entity';
import { UsersService } from '@/users/users.service';

import { CreateExerciseDto } from './dto/CreateExerciseDto.dto';
import { UpdateExerciseDto } from './dto/UpdateExerciseDto.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exercisesRepository: Repository<Exercise>,
    private readonly categoriesService: ExerciseCategoriesService,
    private readonly usersService: UsersService,
  ) {}

  async findOneBy(where: FindOptionsWhere<Exercise>): Promise<Exercise | null> {
    return await this.exercisesRepository.findOne({ where, relations: { creator: true } });
  }

  async findAllPublic(searchText?: string): Promise<Exercise[]> {
    return await this.exercisesRepository.find({
      where: {
        isPrivate: false,
        name: searchText ? ILike(`%${searchText}%`) : undefined,
      },
    });
  }

  async findAllPrivate(userId: string, searchText?: string): Promise<Exercise[]> {
    return await this.exercisesRepository.findBy({
      isPrivate: true,
      creator: {
        id: userId,
      },
      name: searchText ? ILike(`%${searchText}%`) : undefined,
    });
  }

  async findAllMine(userId: string): Promise<Exercise[]> {
    return await this.exercisesRepository.find({
      where: [{ isPrivate: false }, { isPrivate: true, creator: { id: userId } }],
    });
  }

  async create(userId: string, createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const user = await this.usersService.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.isAdmin && !createExerciseDto.isPrivate) {
      throw new ForbiddenException('You are not allowed to create public exercises');
    }

    const category = await this.categoriesService.findOneBy({ id: createExerciseDto.categoryId });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const exercise = this.exercisesRepository.create({
      ...createExerciseDto,
      creator: user,
      category,
    });

    return await this.exercisesRepository.save(exercise);
  }

  async update(id: string, userId: string, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
    const user = await this.usersService.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.isAdmin && !updateExerciseDto.isPrivate) {
      throw new ForbiddenException('You are not allowed to create public exercises');
    }

    const exercise = await this.findOneBy({ id });

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    if (!user.isAdmin && exercise.creator.id !== userId) {
      throw new ForbiddenException('You are not allowed to update this exercise');
    }

    return await this.exercisesRepository.save({ ...exercise, ...updateExerciseDto });
  }

  async delete(id: string, userId: string): Promise<DeleteResult> {
    const user = await this.usersService.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const exercise = await this.findOneBy({ id });

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    if (!user.isAdmin && exercise.creator.id !== userId) {
      throw new ForbiddenException('You are not allowed to delete this exercise');
    }

    return await this.exercisesRepository.delete(id);
  }
}
