import {  IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  name: string;

  @IsString()
  @MinLength(5)
  @MaxLength(100)
  description: string;

}
