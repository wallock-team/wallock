import { IsIn, IsNotEmpty } from 'class-validator';
import { type } from 'os';
import { CategoryType, CategoryTypeValues } from './category-type';

export class CategoryCreateDto {
  @IsNotEmpty()
  name: string;

  @IsIn(CategoryTypeValues)
  type: CategoryType;
}
