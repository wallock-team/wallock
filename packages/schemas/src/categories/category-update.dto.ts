import { IsNotEmpty, IsIn } from "class-validator";
import { CategoryType, CategoryTypeValues } from './category-type.js';

export class CategoryUpdateDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsIn(CategoryTypeValues)
  type: CategoryType;
}