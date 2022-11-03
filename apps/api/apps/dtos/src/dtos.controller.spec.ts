import { Test, TestingModule } from '@nestjs/testing';
import { DtosController } from './dtos.controller';
import { DtosService } from './dtos.service';

describe('DtosController', () => {
  let dtosController: DtosController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DtosController],
      providers: [DtosService],
    }).compile();

    dtosController = app.get<DtosController>(DtosController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(dtosController.getHello()).toBe('Hello World!');
    });
  });
});
