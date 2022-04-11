import { IsIn, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { CategoryTypes } from '../category-types.enum';

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

  @IsIn([CategoryTypes.Seed, CategoryTypes.Crops, CategoryTypes.Machinery, CategoryTypes.Fertilizers,CategoryTypes.Fruits, CategoryTypes.Vegetables])
  type: CategoryTypes;
}
