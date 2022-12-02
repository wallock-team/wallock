import { ConflictException, NotFoundException } from '@nestjs/common';

export class WalletNameAlreadyExistsError extends ConflictException {
  public constructor(name: string) {
    super(`Wallet with name: ${name} already exists`);
  }
}

// Extending NotFoundException instead of ForbiddenException
// to prevent forbidden user from knowing its existence.
export class WalletDoesntBelongToUserError extends NotFoundException {
  public constructor(id: number) {
    super(`Wallet with id ${id} doesn't exist`);
  }
}

export class WalletDoesntExistError extends NotFoundException {
  public constructor(id: number) {
    super(`Wallet with id ${id} doesn't exist`);
  }
}
