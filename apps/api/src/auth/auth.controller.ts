import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './google-auth.guard';
import { Response } from 'express';
import { AuthRequest } from 'src/common/auth-request';
import { Public } from 'src/common/public-url';

@Controller()
export default class AuthController {
  @Get('/login-with-google')
  @Public()
  @UseGuards(GoogleAuthGuard)
  loginWithGoogle(@Req() req: AuthRequest, @Res() res: Response): void {
    const successUrl = req.cookies.success_url;
    res.clearCookie('success_url');
    return res.redirect(successUrl);
  }
}
