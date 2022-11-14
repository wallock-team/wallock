import { IsDefined, IsOptional, IsPositive } from 'class-validator';

export class TransactionCreateDto {
  @IsPositive()
  amount: number;

  @IsOptional()
  note?: string;

  @IsOptional()
  time?: Date;

  @IsPositive()
  categoryId: number;

  @IsPositive()
  walletId: number;
}
