import { Controller, Get } from '@nestjs/common';
import { Public } from './common/public-url';

@Controller()
export class AppController {
  @Get()
  @Public()
  greet() {
    return {
      message:
        'Welcome to Wallock API! This is the RESTful API for Wallock - a financial budgeting web application!',
      git: 'https://github.com/wallock-team/wallock',
      authors: [
        {
          name: 'Minh Quang, Pham',
          email: 'quangpham.245@proton.me',
          github: 'https://github.com/pmq24',
        },
        {
          name: 'Minh Hien, Pham',
          email: 'pmhien2703@gmail.com',
          github: 'https://github.com/pmhien2703',
        },
        {
          name: 'Vu Quoc Cuong, Pham',
          github: 'https://github.com/Cuong15061999',
        },
      ],
    };
  }
}
