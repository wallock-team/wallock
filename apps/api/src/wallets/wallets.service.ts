import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  User,
  Wallet,
  WalletCreateDto,
  WalletUpdateDto,
} from '@wallock/schemas';
import {
  WalletDoesntBelongToUserError,
  WalletDoesntExistError,
  WalletNameAlreadyExistsError,
} from './errors';

export class WalletsService {
  constructor(
    @InjectRepository(Wallet) private readonly walletsRepo: Repository<Wallet>,
  ) {}

  public async createWallet(user: User, dto: WalletCreateDto): Promise<Wallet> {
    const nameAlreadyExists = !!(await this.findWalletByName(user, dto.name));

    if (nameAlreadyExists) {
      throw new WalletNameAlreadyExistsError(dto.name);
    }

    await this.walletsRepo.insert({ ...dto, userId: user.id });

    return await this.findWalletByName(user, dto.name);
  }

  public async updateWallet(user: User, dto: WalletUpdateDto) {
    const walletExist = await this.walletsRepo.findOneBy({ id: dto.id });
    if (!walletExist) {
      throw new WalletDoesntExistError(dto.id);
    }
    if (walletExist.userId !== user.id) {
      throw new WalletDoesntBelongToUserError(dto.id);
    }
    await this.walletsRepo.update(dto.id, dto);
    return this.walletsRepo.findOneBy({ id: dto.id });
  }

  public async findWallets(user: User): Promise<Wallet[]> {
    return await this.walletsRepo.findBy({ userId: user.id });
  }

  public async findWalletById(user: User, id: number): Promise<Wallet | null> {
    const wallet = await this.walletsRepo.findOneBy({ id });

    if (!wallet) {
      throw new WalletDoesntExistError(id);
    }

    if (wallet.userId !== user.id) {
      throw new WalletDoesntBelongToUserError(id);
    }

    return wallet;
  }

  public async findWalletByName(
    user: User,
    name: string,
  ): Promise<Wallet | null> {
    return this.walletsRepo.findOneBy({
      name,
      user: {
        id: user.id,
      },
    });
  }
}
