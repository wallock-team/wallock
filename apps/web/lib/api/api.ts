import axios, { Axios } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { AuthApi } from './auth-api';
import { CategoriesApi } from './categories-api';
import { WalletsApi } from './wallets-api';

export default class Api {
  public static fromWebServer(context: GetServerSidePropsContext) {
    return new Api(context);
  }

  public static fromBrowser() {
    return new Api();
  }

  private readonly axios: Axios;
  public readonly auth: AuthApi;
  public readonly wallets: WalletsApi;
  public readonly categories: CategoriesApi;

  public constructor(context?: GetServerSidePropsContext) {
    const configuredAxios = axios.create({
      baseURL: process.env.API_URL,
      withCredentials: true,
    });

    if (context) {
      const clientCookie = context.req.headers.cookie;
      configuredAxios.defaults.headers.Cookie = String(clientCookie);
    }

    this.axios = configuredAxios;
    this.auth = new AuthApi(this.axios);
    this.wallets = new WalletsApi(this.axios);
    this.categories = new CategoriesApi(this.axios);
  }
}
