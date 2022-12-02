import axios, { AxiosError } from 'axios';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from 'next';
import { ParsedUrlQuery } from 'querystring';

export function withAuthPage<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
>(func: GetServerSideProps<P, Q, D>): GetServerSideProps<P, Q, D> {
  return async function (ctx: GetServerSidePropsContext<Q, D>) {
    if (!(await isAuthenticated(ctx))) {
      return {
        redirect: {
          destination: `/login?success_url=${ctx.resolvedUrl}`,
          permanent: false,
        },
      };
    }

    return await func(ctx);
  };
}

async function isAuthenticated(ctx: GetServerSidePropsContext) {
  try {
    await axios.get(`${process.env.API_URL}/me`, {
      headers: {
        cookie: String(ctx.req.headers.cookie),
      },
    });

    return true;
  } catch (e) {
    if (e instanceof AxiosError && e.response?.status === 401) {
      return false;
    }

    throw e;
  }
}
