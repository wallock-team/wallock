import { IsDefined, IsNotEmpty, IsOptional } from 'class-validator';
import { OpenIdCreateDto } from './open-id-create.dto.js';

export class UserCreateDto {
  @IsDefined()
  openId: OpenIdCreateDto;

  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;
}
