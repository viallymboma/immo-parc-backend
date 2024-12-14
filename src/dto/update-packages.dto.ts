/* eslint-disable prettier/prettier */
import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdatePackageDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  level?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  inverstment?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  numberOfTaskPerDay?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  priceEarnedPerTaskDone?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  priceEarnedForAllTaskDonePerDay?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  priceEarnedForAllTaskDonePerMonth?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  priceEarnedForAllTaskDonePerYear?: number;

  @IsOptional()
  @IsString()
  description?: string;

  // @IsOptional()
  // @IsMap()
  // options?: Map<string, string>;
}
