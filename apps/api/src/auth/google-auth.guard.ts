import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport'
import { EnvService } from '../env'

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  constructor(private readonly envService: EnvService) {
    super()
  }

  getAuthenticateOptions(context: ExecutionContext): IAuthModuleOptions<{}> {
    const req = context.switchToHttp().getRequest()
    const res = context.switchToHttp().getResponse()

    const successUrl = req.query.success_url
    res.cookie('success_url', successUrl || this.envService.env.baseUrl)

    return {}
  }
}
