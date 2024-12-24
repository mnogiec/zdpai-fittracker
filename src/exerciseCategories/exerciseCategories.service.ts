import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ExerciseCategory } from '@/models/exerciseCategory.entity';

@Injectable()
export class ExerciseCategoriesService {
  constructor(
    @InjectRepository(ExerciseCategory)
    private readonly exerciseCategoriesRepository: Repository<ExerciseCategory>,
  ) {}

  async findAll() {
    return await this.exerciseCategoriesRepository.find();
  }
}
