import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Exercise } from '@/models/exercise.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exercisesRepository: Repository<Exercise>,
  ) {}

  async findAllPublic(searchText?: string) {
    return await this.exercisesRepository.find({
      where: {
        isPrivate: false,
        name: searchText ? ILike(`%${searchText}%`) : undefined,
      },
    });
  }

  async findAllPrivate(userId: string, searchText?: string) {
    return await this.exercisesRepository.findBy({
      isPrivate: true,
      creator: {
        id: userId,
      },
      name: searchText ? ILike(`%${searchText}%`) : undefined,
    });
  }

  async findAllMine(userId: string) {
    return await this.exercisesRepository.find({
      where: [{ isPrivate: false }, { isPrivate: true, creator: { id: userId } }],
    });
  }
}
