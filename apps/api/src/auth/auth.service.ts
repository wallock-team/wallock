import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Profile } from 'passport-google-oauth20';

import { User } from '@wallock/schemas';
import { UsersService } from 'src/users';

const GOOGLE_ISS = 'https://accounts.google.com';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async loginOrSignUpFromGoogle(profile: Profile): Promise<LoginResult> {
    let user = await this.usersService.getUserByOpenId({
      iss: GOOGLE_ISS,
      sub: profile.id,
    });

    if (!user) {
      user = await this.usersService.createUser({
        openId: {
          iss: GOOGLE_ISS,
          sub: profile.id,
        },
      });
    }

    const jwtPayload = {
      iss: user.openId.iss,
      sub: user.openId.sub,
    };

    const jwt = this.jwtService.sign(jwtPayload);

    return {
      user,
      jwt,
    };
  }
}

type LoginResult = {
  user: User;
  jwt: string;
};
