import { IsIn, IsNotEmpty } from 'class-validator';
import { CategoryType, CategoryTypeValues } from './category-type.js';

export class CategoryCreateDto {
  @IsNotEmpty()
  name: string;

  @IsIn(CategoryTypeValues)
  type: CategoryType;
}
