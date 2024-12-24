import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { ExerciseCategory } from '@/models/exerciseCategory.entity';

@Injectable()
export class ExerciseCategoriesService {
  constructor(
    @InjectRepository(ExerciseCategory)
    private readonly exerciseCategoriesRepository: Repository<ExerciseCategory>,
  ) {}

  async findAll(): Promise<ExerciseCategory[]> {
    return await this.exerciseCategoriesRepository.find();
  }

  async findOneBy(where: FindOptionsWhere<ExerciseCategory>): Promise<ExerciseCategory | null> {
    return await this.exerciseCategoriesRepository.findOneBy(where);
  }
}
