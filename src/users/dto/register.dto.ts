import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(128)
  @Transform(({ value }) => value?.toLowerCase()?.trim())
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  @Transform(({ value }) => value?.trim())
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  @Transform(({ value }) => value?.trim())
  readonly lastName: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  readonly password: string;
}
