import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(configService: ConfigService) {
    this.env = configService.get('ENV');
    this.baseUrl = configService.get('API_URL');
    this.oidc;
    this.oidc = {
      google: {
        clientId: configService.get('OIDC_GOOGLE_CLIENT_ID'),
        clientSecret: configService.get('OIDC_GOOGLE_CLIENT_SECRET'),
      },
    };
  }

  public readonly env: string;

  public readonly baseUrl: string;

  public readonly oidc: {
    google: OpenIdProviderSetting;
  };
}

type OpenIdProviderSetting = {
  clientId: string;
  clientSecret: string;
};
