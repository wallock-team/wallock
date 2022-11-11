import { Wallet, WalletCreateDto } from '@wallock/schemas';
import { Axios } from 'axios';

export class WalletsApi {
  constructor(private readonly axios: Axios) {}

  async createWallet(dto: WalletCreateDto) {
    return (await this.axios.post<Wallet>('/wallets', dto)).data;
  }

  async getWallets() {
    return (await this.axios.get<Wallet[]>('/wallets')).data;
  }
}
