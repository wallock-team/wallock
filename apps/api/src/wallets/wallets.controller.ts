import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { WalletCreateDto } from '@wallock/schemas';
import { AuthRequest } from 'src/common/auth-request';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  async createWallet(@Req() req: AuthRequest, @Body() dto: WalletCreateDto) {
    return await this.walletsService.createWallet(req.user, dto);
  }

  @Get()
  async findWallet(@Req() req: AuthRequest) {
    return await this.walletsService.findWallets(req.user);
  }

  @Get(':id')
  async findWalletWithId(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthRequest,
  ) {
    return await this.walletsService.findWalletById(req.user, id);
  }
}
