import { Module } from '@nestjs/common';
import { DtosController } from './dtos.controller';
import { DtosService } from './dtos.service';

@Module({
  imports: [],
  controllers: [DtosController],
  providers: [DtosService],
})
export class DtosModule {}
