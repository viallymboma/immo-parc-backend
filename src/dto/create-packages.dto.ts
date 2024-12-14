/* eslint-disable prettier/prettier */
import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePackageDto {
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  // @IsOptional()
  level: number;

  @IsInt()
  @IsPositive()
  inverstment: number;

  @IsInt()
  @IsPositive()
  numberOfTaskPerDay: number;

  @IsInt()
  @IsPositive()
  priceEarnedPerTaskDone: number;

  @IsInt()
  @IsPositive()
  priceEarnedForAllTaskDonePerDay: number;

  @IsInt()
  @IsPositive()
  priceEarnedForAllTaskDonePerMonth: number;

  @IsInt()
  @IsPositive()
  priceEarnedForAllTaskDonePerYear: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  listOfTasks: []

//   @IsOptional()
//   @IsMap()
//   options?: Map<string, string>;
}
