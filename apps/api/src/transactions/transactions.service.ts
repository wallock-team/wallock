import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  User,
  Transaction,
  TransactionCreateDto,
  TransactionUpdateDto,
} from '@wallock/schemas';
import {
  TransactionDoesntBelongToUserError,
  TransactionDoesntExistError,
} from './errors';
import { CategoriesService } from '../categories';
import { WalletsService } from '../wallets';
import { isEmpty, omit } from 'lodash';
import { time } from 'console';

export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepo: Repository<Transaction>,
    private readonly categoriesService: CategoriesService,
    private readonly walletsService: WalletsService,
  ) {}

  public async createTransaction(
    user: User,
    dto: TransactionCreateDto,
  ): Promise<Transaction> {
    // Check ìf categories exists or doesn't belong to user
    await this.categoriesService.findCategoryById(user, dto.categoryId);

    // Check ìf wallet exists or doesn't belong to user
    await this.walletsService.findWalletById(user, dto.walletId);

    const insertResult = await this.transactionsRepo.insert({
      ...dto,
      time: dto.time ?? new Date(),
    });

    return await this.findTransactionById(
      user,
      insertResult.identifiers.at(0).id,
    );
  }

  public async updateTransaction(user: User, dto: TransactionUpdateDto) {
    const transaction = await this.transactionsRepo.findOneBy({ id: dto.id });
    if (!transaction) {
      throw new TransactionDoesntExistError(dto.id);
    }
    if (transaction.wallet.userId !== user.id) {
      throw new TransactionDoesntBelongToUserError(dto.id);
    }
    await this.transactionsRepo.update(dto.id, {
      ...omit(dto, 'categoryId', 'walletId'),
      category: await this.categoriesService.findCategoryById(
        user,
        dto.categoryId,
      ),
      wallet: await this.walletsService.findWalletById(user, dto.walletId),
    });
    return await this.transactionsRepo.findOneBy({ id: dto.id });
  }

  public async findTransactionById(
    user: User,
    id: number,
  ): Promise<Transaction> {
    const transaction = await this.transactionsRepo.findOne({
      where: { id },
      relations: {
        category: true,
        wallet: true,
      },
    });

    if (!transaction) {
      throw new TransactionDoesntExistError(id);
    }

    if (transaction.wallet.userId !== user.id) {
      throw new TransactionDoesntBelongToUserError(id);
    }

    return transaction;
  }

  public async findTransactions(
    user: User,
    findOptions: FindTransactionsOptions,
  ) {
    if (!findOptions || isEmpty(findOptions)) {
      return (await this.findAllTransactions(user)).sort(
        (t1, t2) => +t2.time - +t1.time,
      );
    } else {
      return await this.findTransactionsByWalletId(user, findOptions.walletId);
    }
  }

  private async findAllTransactions(user: User) {
    return await this.transactionsRepo.find({
      where: {
        wallet: {
          userId: user.id,
        },
      },
      relations: {
        category: true,
      },
    });
  }

  private async findTransactionsByWalletId(user: User, walletId: number) {
    const wallet = await this.walletsService.findWalletById(user, walletId);

    return await this.transactionsRepo.findBy({
      wallet: wallet,
    });
  }
}

type FindTransactionsOptions = {
  walletId?: number;
};
