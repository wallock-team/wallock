import { Category, CategoryCreateDto } from '@wallock/schemas';
import { Axios } from 'axios';

export class CategoriesApi {
  constructor(private readonly axios: Axios) {}

  async createWallet(dto: CategoryCreateDto) {
    return (await this.axios.post<Category>('/categories', dto)).data;
  }

  async getWallets() {
    return (await this.axios.get<Category[]>('/categories')).data;
  }
}
