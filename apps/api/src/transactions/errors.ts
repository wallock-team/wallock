import { NotFoundException } from '@nestjs/common';

// Extending NotFoundException instead of ForbiddenException
// to prevent forbidden user from knowing its existence.
export class TransactionDoesntBelongToUserError extends NotFoundException {
  public constructor(id: number) {
    super(`Transaction with id ${id} doesn't exist`);
  }
}

export class TransactionDoesntExistError extends NotFoundException {
  public constructor(id: number) {
    super(`Transaction with id ${id} doesn't exist`);
  }
}
