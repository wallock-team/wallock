import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Transaction, TransactionCreateDto } from '@wallock/schemas';
import {
  TransactionDoesntBelongToUserError,
  TransactionDoesntExistError,
} from './errors';
import { CategoriesService } from '../categories';
import { WalletsService } from '../wallets';
import { isEmpty } from 'lodash';

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
    const category = await this.categoriesService.findCategoryById(
      user,
      dto.categoryId,
    );

    const wallet = await this.walletsService.findWalletById(user, dto.walletId);

    const insertResult = await this.transactionsRepo.insert({
      ...dto,
      category,
      wallet,
      time: dto.time ?? new Date(),
    });

    return await this.findTransactionById(
      user,
      insertResult.identifiers.at(0).id,
    );
  }

  public async findTransactionById(
    user: User,
    id: number,
  ): Promise<Transaction> {
    const transaction = await this.transactionsRepo.findOneBy({ id });

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
      return await this.findAllTransactions(user);
    } else {
      return await this.findTransactionsByWalletId(user, findOptions.walletId);
    }
  }

  private async findAllTransactions(user: User) {
    return await this.transactionsRepo.findBy({
      wallet: {
        userId: user.id,
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
