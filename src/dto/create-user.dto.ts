/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsOptional() // Optional in case the status is auto-assigned during creation
  readonly status?: string;

  @IsString()
  @IsOptional() // Optional in case you do not add it
  readonly firstName?: string;

  @IsString()
  @IsOptional() // Optional in case you do not add it
  readonly lastName?: string;
}

