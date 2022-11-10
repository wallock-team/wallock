import axios, { Axios } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { AuthApi } from './auth-api';

export default class Api {
  public static fromWebServer(context: GetServerSidePropsContext) {
    return new Api(context);
  }

  public static fromBrowser() {
    return new Api();
  }

  private readonly axios: Axios;
  public readonly auth: AuthApi;

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
  }
}
