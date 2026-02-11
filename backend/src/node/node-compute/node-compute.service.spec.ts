import { Test, TestingModule } from '@nestjs/testing';
import { NodeComputeService } from './node-compute.service';

describe('NodeComputeService', () => {
  let service: NodeComputeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeComputeService],
    }).compile();

    service = module.get<NodeComputeService>(NodeComputeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
