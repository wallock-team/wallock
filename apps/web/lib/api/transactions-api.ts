import { Transaction, TransactionCreateDto } from '@wallock/schemas';
import { Axios } from 'axios';

export class TransactionsApi {
  constructor(private readonly axios: Axios) {}

  async createTransaction(dto: TransactionCreateDto) {
    return (await this.axios.post<Transaction>('/transactions')).data;
  }

  async getTransactions() {
    return (await this.axios.get<Transaction[]>('/transactions')).data;
  }

  async getTransactionById(id: number) {
    return (await this.axios.get<Transaction>(`/transactions/${id}`)).data;
  }
}
