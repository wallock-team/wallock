import { ConflictException } from '@nestjs/common';
import { OpenId } from '@wallock/schemas';

export class UserAlreadyExistsError extends ConflictException {
  public constructor({ iss, sub }: OpenId) {
    super(
      `User with 'iss' ${iss} and 'sub' ${sub} already exists.` +
        'Please, log in instead.',
    );
  }
}
