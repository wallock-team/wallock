import { Injectable } from '@nestjs/common';

@Injectable()
export class DtosService {
  getHello(): string {
    return 'Hello World!';
  }
}
