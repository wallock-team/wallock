import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  iss: string

  @IsNotEmpty()
  sub: string

  @IsOptional()
  firstName?: string

  @IsOptional()
  lastName?: string
}
