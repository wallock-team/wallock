import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@wallock/schemas';
import { AppController } from './app.controller';
import { AuthModule } from './auth';
import { EnvModule, EnvService } from './env';
import { UsersModule } from './users';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async function (envService: EnvService) {
        if (envService.env.env === 'dev') {
          return {
            type: 'better-sqlite3',
            database: ':memory:',
            synchronize: true,
            entities: [User],
          };
        }
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
