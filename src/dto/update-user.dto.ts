/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsEmail()
  @IsOptional()
  readonly phone?: string;

  @IsString()
  @MinLength(6)
  @IsOptional() // Optional since the password may not always be updated
  readonly password?: string;

  @IsString()
  @IsOptional()
  readonly status?: string;

  @IsString()
  @IsOptional() // Optional in case you do not add it
  readonly firstName?: string;

  @IsString()
  @IsOptional() // Optional in case you do not add it
  readonly lastName?: string;
}
