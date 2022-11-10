import { IsNotEmpty } from 'class-validator';

export class WalletCreateDto {
  @IsNotEmpty()
  name: string;
}
