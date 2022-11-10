import { Controller, Get, Req } from '@nestjs/common';
import { AuthRequest } from 'src/common/auth-request';

@Controller()
export class UsersController {
  constructor() {}

  @Get('/me')
  getProfile(@Req() req: AuthRequest) {
    return req.user;
  }
}
