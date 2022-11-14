import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  User,
  Category,
  CategoryCreateDto,
  type CategoryType,
} from '@wallock/schemas';
import {
  CategoryDoesntBelongToUserError,
  CategoryDoesntExistError,
  CategoryNameAndTypeAlreadyExistsError,
} from './errors';

export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepo: Repository<Category>,
  ) {}

  public async createCategory(
    user: User,
    dto: CategoryCreateDto,
  ): Promise<Category> {
    const categoryAlreadyExists = !!(await this.findCategoryByNameAndType(
      user,
      dto.name,
      dto.type,
    ));

    if (categoryAlreadyExists) {
      throw new CategoryNameAndTypeAlreadyExistsError(dto.name, dto.type);
    }

    await this.categoriesRepo.insert({ ...dto, userId: user.id });

    return await this.findCategoryByNameAndType(user, dto.name, dto.type);
  }

  public async findCategories(user: User): Promise<Category[]> {
    return await this.categoriesRepo.findBy({ userId: user.id });
  }

  public async findCategoryById(
    user: User,
    id: number,
  ): Promise<Category | null> {
    const category = await this.categoriesRepo.findOneBy({ id });

    if (!category) {
      throw new CategoryDoesntExistError(id);
    }

    if (category.userId !== user.id) {
      throw new CategoryDoesntBelongToUserError(id);
    }

    return category;
  }

  public async findCategoryByNameAndType(
    user: User,
    name: string,
    type: CategoryType,
  ): Promise<Category | null> {
    return this.categoriesRepo.findOneBy({
      name,
      type,
      user: {
        id: user.id,
      },
    });
  }
}
