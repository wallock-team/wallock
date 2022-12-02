import { IsNotEmpty } from 'class-validator';

export class OpenIdCreateDto {
  @IsNotEmpty()
  iss: string;

  @IsNotEmpty()
  sub: string;
}
