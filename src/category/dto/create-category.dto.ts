import { IsIn, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { CategoryTypes } from '../category.enums';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(100)
  description: string;

  @IsIn([CategoryTypes.Seed, CategoryTypes.Fertilizers, CategoryTypes.Vegetables, CategoryTypes.Crops,CategoryTypes.Machinery, CategoryTypes.Crops])
  type: CategoryTypes;
}
