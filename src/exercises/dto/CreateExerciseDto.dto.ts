import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateExerciseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  @Transform(({ value }) => value?.trim())
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly categoryId: number;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  readonly description?: string;

  @IsOptional()
  @IsString()
  readonly videoUrl?: string;

  @IsOptional()
  @IsString()
  readonly imageUrl?: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly isPrivate: boolean;
}
