import { NestFactory } from '@nestjs/core';
import { DtosModule } from './dtos.module';

async function bootstrap() {
  const app = await NestFactory.create(DtosModule);
  await app.listen(3000);
}
bootstrap();
