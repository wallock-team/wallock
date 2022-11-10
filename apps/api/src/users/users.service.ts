import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, OpenId, UserCreateDto } from '@wallock/schemas';
import { UserAlreadyExistsError } from './errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async createUser(dto: UserCreateDto) {
    const userInDb = await this.usersRepo.findOneBy({
      openId: dto.openId,
    });

    if (userInDb) {
      throw new UserAlreadyExistsError(userInDb.openId);
    }

    await this.usersRepo.insert(dto);

    return await this.usersRepo.findOneBy({ openId: dto.openId });
  }

  async getUserByOpenId(openId: OpenId) {
    return await this.usersRepo.findOneBy({
      openId,
    });
  }
}
