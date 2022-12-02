<<<<<<< HEAD
import { IsNotEmpty } from "class-validator";
=======
import { IsNotEmpty } from 'class-validator';
>>>>>>> b19b7430b73a80211684fb94773eaba6993dae4b

export class WalletUpdateDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;
}
