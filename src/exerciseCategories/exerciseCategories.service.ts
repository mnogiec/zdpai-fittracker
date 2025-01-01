import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { FindOptionsWhere, Repository } from 'typeorm';

import { ExerciseCategory } from '@/models/exerciseCategory.entity';

const CACHE_KEY = 'exerciseCategories';
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours

@Injectable()
export class ExerciseCategoriesService {
  constructor(
    @InjectRepository(ExerciseCategory)
    private readonly exerciseCategoriesRepository: Repository<ExerciseCategory>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async findAll(): Promise<ExerciseCategory[]> {
    const cachedCategories = await this.cacheManager.get<ExerciseCategory[]>(CACHE_KEY);
    if (cachedCategories) {
      return cachedCategories;
    }

    const categories = await this.exerciseCategoriesRepository.find();
    await this.cacheManager.set(CACHE_KEY, categories, CACHE_EXPIRATION_TIME);

    return categories;
  }

  async findOneBy(where: FindOptionsWhere<ExerciseCategory>): Promise<ExerciseCategory | null> {
    return await this.exerciseCategoriesRepository.findOneBy(where);
  }
}
