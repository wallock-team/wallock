import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { TransactionCreateDto } from '@wallock/schemas';
import { AuthRequest } from 'src/common/auth-request';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly categoriesService: TransactionsService) {}

  @Post()
  async createTransaction(
    @Req() req: AuthRequest,
    @Body() dto: TransactionCreateDto,
  ) {
    return await this.categoriesService.createTransaction(req.user, dto);
  }

  @Get(':id')
  async findTransactionWithId(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthRequest,
  ) {
    return await this.categoriesService.findTransactionById(req.user, id);
  }
}
