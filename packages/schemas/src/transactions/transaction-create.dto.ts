import { IsDefined, IsOptional, IsPositive } from 'class-validator';

export class TransactionCreateDto {
  @IsPositive()
  amount: number;

  @IsOptional()
  note?: string;

  @IsPositive()
  categoryId: number;

  @IsPositive()
  walletId: number;
}
