import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as joi from 'joi';

export const envValidation = joi.object({
  ENV: joi.string().valid('dev', 'prod').required(),

  API_URL: joi.when('ENV', {
    is: 'dev',
    then: joi.string().optional().default('localhost:3000'),
    otherwise: joi.string().required(),
  }),

  WEB_URL: joi.when('ENV', {
    is: 'dev',
    then: joi.string().optional().default('localhost:3001'),
    otherwise: joi.string().required(),
  }),

  OIDC_GOOGLE_CLIENT_ID: joi.string().required(),
  OIDC_GOOGLE_CLIENT_SECRET: joi.string().required(),

  SECRET_JWT: joi.when('ENV', {
    is: 'dev',
    then: joi.string().default('Hello world!'),
    otherwise: joi.string().required(),
  }),

  SECRET_SESSION: joi.when('ENV', {
    is: 'dev',
    then: joi.string().default('Hello world!'),
    otherwise: joi.string().required(),
  }),

  SECRET_COOKIE: joi.when('ENV', {
    is: 'dev',
    then: joi.string().default('Hello world!'),
    otherwise: joi.string().required(),
  }),
});

@Injectable()
export class EnvService {
  constructor(cfg: ConfigService) {
    this.env = {
      env: cfg.get('ENV'),
      baseUrl: cfg.get('API_URL'),
      webUrl: cfg.get('WEB_URL'),
      oidc: {
        google: {
          id: cfg.get('OIDC_GOOGLE_CLIENT_ID'),
          secret: cfg.get('OIDC_GOOGLE_CLIENT_SECRET'),
        },
      },
      secrets: {
        jwt: cfg.get('SECRET_JWT'),
        cookie: cfg.get('SECRET_COOKIE'),
        session: cfg.get('SECRET_SESSION'),
      },
    };
  }

  public readonly env: {
    env: 'dev' | 'prod';
    baseUrl: string;
    webUrl: string;
    oidc: {
      google: {
        id: string;
        secret: string;
      };
    };
    secrets: {
      jwt?: string;
      cookie?: string;
      session?: string;
    };
  };
}
