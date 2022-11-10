import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env';

import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { JwtAuthGuard } from './auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get<EnvService>(EnvService).env;

  const cookieMiddleware = cookieParser(env.secrets.cookie);

  const ONE_HOUR = 60 * 60 * 1000;
  const sessionMiddleware = session({
    secret: env.secrets.session,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: ONE_HOUR,
      httpOnly: true,
      secure: env.env === 'prod',
    },
  });

  const globalAuthGuard = new JwtAuthGuard(app.get(Reflector));

  const corsSettings = {
    credentials: true,
    origin: [env.webUrl],
  };

  app
    .use(cookieMiddleware)
    .use(sessionMiddleware)
    .useGlobalGuards(globalAuthGuard)
    .enableCors(corsSettings);

  await app.listen(3000);
}
bootstrap();
