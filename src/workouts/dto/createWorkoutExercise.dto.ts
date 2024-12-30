import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateWorkoutExerciseDto {
  @IsOptional()
  @IsUUID()
  readonly workoutDayId?: string;

  @IsNotEmpty()
  @IsUUID()
  readonly exerciseId: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly weight: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly reps: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly sets: number;
}
