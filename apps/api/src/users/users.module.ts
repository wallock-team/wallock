import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@wallock/schemas';
import { CategoriesModule } from '../categories';
import { WalletsModule } from '../wallets';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CategoriesModule, WalletsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
