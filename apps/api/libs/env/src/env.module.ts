import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './env.service';
import { envValidation } from './env-validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envValidation,
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
