import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateWorkoutExerciseDto {
  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;

  @IsNotEmpty()
  @IsNumber()
  readonly reps: number;

  @IsNotEmpty()
  @IsNumber()
  readonly sets: number;
}
