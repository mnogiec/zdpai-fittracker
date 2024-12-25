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
  readonly weight: number;

  @IsNotEmpty()
  @IsNumber()
  readonly reps: number;

  @IsNotEmpty()
  @IsNumber()
  readonly sets: number;
}
