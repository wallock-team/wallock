import { IsNotEmpty } from "class-validator";
import * as yup from "yup";
export class WalletCreateDto {
  @IsNotEmpty()
  name: string;
}

export const WalletCreateYup = yup.object({
  name: yup.string().trim().required("Name is required"),
});
