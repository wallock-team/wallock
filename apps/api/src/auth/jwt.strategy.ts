import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { User } from '@wallock/schemas';
import { EnvService } from 'src/env';
import { forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/users';

function fromCookie(req: Request): string | null {
  return req.cookies?.jwt;
}
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(forwardRef(() => EnvService))
    envService: EnvService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([fromCookie]),
      secretOrKey: envService.env.secrets.jwt,
    });
  }

  async validate(jwt: any): Promise<User | false> {
    if (
      !jwt ||
      typeof jwt !== 'object' ||
      !jwt.sub ||
      typeof jwt.sub !== 'string' ||
      !jwt.iss ||
      typeof jwt.iss !== 'string'
    ) {
      return false;
    }

    const user = await this.userService.getUserByOpenId({
      iss: jwt.iss,
      sub: jwt.sub,
    });

    if (!user) {
      return false;
    } else {
      return user;
    }
  }
}
