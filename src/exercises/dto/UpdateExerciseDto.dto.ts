import { PartialType } from '@nestjs/swagger';

import { CreateExerciseDto } from './CreateExerciseDto.dto';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {}
