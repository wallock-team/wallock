import { IsNotEmpty } from 'class-validator';

export class WalletUpdateDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;
}
