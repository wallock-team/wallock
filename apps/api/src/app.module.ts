import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Wallet } from '@wallock/schemas';
import { AppController } from './app.controller';
import { AuthModule } from './auth';
import { EnvModule, EnvService } from './env';
import { UsersModule } from './users';
import { WalletsModule } from './wallets';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    WalletsModule,
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async function (envService: EnvService) {
        if (envService.env.env === 'dev') {
          return {
            type: 'better-sqlite3',
            database: ':memory:',
            synchronize: true,
            entities: [User, Wallet],
          };
        }
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
