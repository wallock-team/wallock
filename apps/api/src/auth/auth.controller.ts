import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'

import { AuthenticatedRequest } from 'src/commons'
import { Public } from 'src/common/public-url'

import { GoogleAuthGuard } from './google-auth.guard'
import { Response } from 'express'

@Controller()
export default class AuthController {
  @Get('/login-with-google')
  @Public()
  @UseGuards(GoogleAuthGuard)
  loginWithGoogle(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response
  ): void {
    const successUrl = req.cookies.success_url
    res.clearCookie('success_url')
    return res.redirect(successUrl)
  }
}
