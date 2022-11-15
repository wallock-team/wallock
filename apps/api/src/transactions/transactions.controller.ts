import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { TransactionCreateDto } from '@wallock/schemas';
import { AuthRequest } from 'src/common/auth-request';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async createTransaction(
    @Req() req: AuthRequest,
    @Body() dto: TransactionCreateDto,
  ) {
    return await this.transactionsService.createTransaction(req.user, dto);
  }

  @Get()
  async findTransactions(
    @Req() req: AuthRequest,
    @Query('wallet-id', ParseIntPipe) walletId?: number,
  ) {
    const findOptions = {
      ...(walletId ? { walletId } : {}),
    };

    return await this.transactionsService.findTransactions(
      req.user,
      findOptions,
    );
  }

  @Get(':id')
  async findTransactionWithId(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthRequest,
  ) {
    return await this.transactionsService.findTransactionById(req.user, id);
  }
}
