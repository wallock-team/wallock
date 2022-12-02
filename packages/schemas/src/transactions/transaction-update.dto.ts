import { IsNotEmpty, IsOptional, IsPositive } from "class-validator";

export class TransactionUpdateDto {
  @IsNotEmpty()
  id: number;

  @IsPositive()
  amount: number;

  @IsOptional()
  note?: string;

  @IsOptional()
  time?: Date;

  @IsNotEmpty()
  @IsPositive()
  categoryId: number;

  @IsNotEmpty()
  @IsPositive()
  walletId: number;
}