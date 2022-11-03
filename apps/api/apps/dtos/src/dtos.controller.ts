import { Controller, Get } from '@nestjs/common';
import { DtosService } from './dtos.service';

@Controller()
export class DtosController {
  constructor(private readonly dtosService: DtosService) {}

  @Get()
  getHello(): string {
    return this.dtosService.getHello();
  }
}
