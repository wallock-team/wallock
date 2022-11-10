import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'

import { Repository } from 'typeorm'
import { Profile } from 'passport-google-oauth20'

import { User } from 'src/users'
import { CategoriesService } from '../categories/categories.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly categoriesService: CategoriesService
  ) {}

  async loginOrSignUpFromGoogle(
    profile: Profile
  ): Promise<{ user: User; jwt: string }> {
    let user = await this.findGoogleOpenId(profile.id)

    if (!user) {
      user = await this.createGoogleOpenId(profile)
    }

    const jwtPayload = {
      sub: user.id
    }

    const jwt = await this.signJwt(jwtPayload)

    return {
      user,
      jwt
    }
  }

  private async signJwt(jwtPayload: any) {
    return await this.jwtService.signAsync(jwtPayload)
  }

  private async findGoogleOpenId(sub: string): Promise<User | null> {
    const iss = 'https://accounts.google.com'

    return await this.userRepo.findOneBy({ iss, sub })
  }

  private async createGoogleOpenId(profile: Profile): Promise<User> {
    const iss = 'https://accounts.google.com'
    await this.userRepo.insert({
      iss,
      sub: profile.id,
      firstName: profile.name.familyName,
      lastName: profile.name.givenName
    })

    const createdUser = await this.userRepo.findOneBy({ iss, sub: profile.id })

    await this.categoriesService.createInitialCategories(createdUser)
    return await this.findGoogleOpenId(profile.id)
  }
}
