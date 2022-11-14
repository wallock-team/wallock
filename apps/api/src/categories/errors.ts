import { ConflictException, NotFoundException } from '@nestjs/common';

import { CategoryType } from '@wallock/schemas';

export class CategoryNameAndTypeAlreadyExistsError extends ConflictException {
  public constructor(name: string, type: CategoryType) {
    super(`The ${type} category named '${name}' already exists`);
  }
}

// Extending NotFoundException instead of ForbiddenException
// to prevent forbidden user from knowing its existence.
export class CategoryDoesntBelongToUserError extends NotFoundException {
  public constructor(id: number) {
    super(`Category with id ${id} doesn't exist`);
  }
}

export class CategoryDoesntExistError extends NotFoundException {
  public constructor(id: number) {
    super(`Category with id ${id} doesn't exist`);
  }
}
