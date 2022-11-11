import { Wallet } from '@wallock/schemas';
import { Axios } from 'axios';

export class WalletsApi {
  constructor(private readonly axios: Axios) {}

  async getWallets() {
    return (await this.axios.get<Wallet[]>('/wallets')).data;
  }
}
