import { Wallet, WalletCreateDto, WalletUpdateDto } from '@wallock/schemas';
import { Axios } from 'axios';

export class WalletsApi {
  constructor(private readonly axios: Axios) {}

  async createWallet(dto: WalletCreateDto) {
    return (await this.axios.post<Wallet>('/wallets', dto)).data;
  }

  async updateWallet(dto: WalletUpdateDto) {
    return (await this.axios.patch<Wallet>('/wallets', dto)).data;
  }

  async getWallets() {
    return (await this.axios.get<Wallet[]>('/wallets')).data;
  }
}
