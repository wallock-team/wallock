import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  User,
  OpenId,
  UserCreateDto,
  CategoryCreateDto,
} from '@wallock/schemas';
import { UserAlreadyExistsError } from './errors';
import { CategoriesService } from '../categories';
import { WalletsService } from '../wallets';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private readonly categoriesService: CategoriesService,
    private readonly walletsService: WalletsService,
  ) {}

  async createUser(dto: UserCreateDto) {
    const userInDb = await this.usersRepo.findOneBy({
      openId: dto.openId,
    });

    if (userInDb) {
      throw new UserAlreadyExistsError(userInDb.openId);
    }

    await this.usersRepo.insert(dto);

    const user = await this.usersRepo.findOneBy({ openId: dto.openId });

    await this.walletsService.createWallet(user, {
      name: 'Cash',
    });

    const initialCategories: CategoryCreateDto[] = [
      {
        name: 'Monthly bill',
        type: 'expense',
      },
      {
        name: 'Salary',
        type: 'income',
      },
    ];

    for (const c of initialCategories) {
      await this.categoriesService.createCategory(user, c);
    }

    return user;
  }

  async getUserByOpenId(openId: OpenId) {
    return await this.usersRepo.findOneBy({
      openId,
    });
  }
}
