import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  User,
  Category,
  CategoryCreateDto,
  CategoryUpdateDto,
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

    await this.categoriesRepo.insert({ ...dto, user });

    return await this.findCategoryByNameAndType(user, dto.name, dto.type);
  }

  public async updateCategory(user: User, dto: CategoryUpdateDto) {
    const category = await this.categoriesRepo.findOneBy({ id: dto.id });
    if (!category) {
      throw new CategoryDoesntExistError(dto.id);
    }
    if (category.userId !== user.id) {
      throw new CategoryDoesntBelongToUserError(dto.id);
    }
    const categoryWithNameAndType = !!(await this.findCategoryByNameAndType(
      user,
      category.name,
      category.type,
    ));
    if (categoryWithNameAndType) {
      throw new CategoryNameAndTypeAlreadyExistsError(dto.name, category.type);
    }
    await this.categoriesRepo.update(dto.id, {
      name: dto.name,
    });
    return await this.findCategoryByNameAndType(user, dto.name, category.type);
  }

  public async findCategories(user: User): Promise<Category[]> {
    return await this.categoriesRepo.findBy({ userId: user.id });
  }

  public async findCategoryById(user: User, id: number): Promise<Category> {
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
