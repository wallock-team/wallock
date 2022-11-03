import * as joi from 'joi';

export const envValidation = joi.object({
  ENV: joi.string().valid('dev', 'prod').required(),
  PORT: joi.number().default(3000),
  API_URL: joi.string().required(),
  OIDC_GOOGLE_CLIENT_ID: joi.string().required(),
  OIDC_GOOGLE_CLIENT_SECRET: joi.string().required(),
});
