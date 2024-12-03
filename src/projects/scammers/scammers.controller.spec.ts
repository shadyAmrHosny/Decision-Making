import { Test, TestingModule } from '@nestjs/testing';
import { ScammersController } from './scammers.controller';

describe('ScammersController', () => {
  let controller: ScammersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScammersController],
    }).compile();

    controller = module.get<ScammersController>(ScammersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
