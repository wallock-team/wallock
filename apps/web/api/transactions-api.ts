import { Axios } from 'axios'
import { ReadTransactionDto } from 'dtos'

export default class TransactionsApi {
  public constructor(private readonly configuredAxios: Axios) {}

  async getAllTransactions() {
    return (
      await this.configuredAxios.get<ReadTransactionDto[]>('/transactions')
    ).data
  }

  async getCurrentMonth() {
    return await this.configuredAxios.get('/transactions/current-month')
  }
  async getById(id: any) {
    return (await this.configuredAxios.get(`/transactions/${id}`)).data
  }
  initialTransition() {
    return {
      amount: 0,
      date: new Date(),
      note: '',
      cateId: 1
    }
  }
  async add(transaction: any) {
    console.log('Transaction added' + JSON.stringify(transaction))
    return await this.configuredAxios.post('/transactions', transaction)
  }
  async update(transaction: any) {
    return await this.configuredAxios.patch(`/transactions`, transaction)
  }
  async remove(id: number) {
    return await this.configuredAxios.delete(`/transactions/${id}`)
  }
}
