import { IsDefined, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOpenIdDto {
  @IsNotEmpty()
  iss: string;

  @IsNotEmpty()
  sub: string;
}

export class CreateUserDto {
  @IsDefined()
  openId: CreateOpenIdDto;

  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;
}
