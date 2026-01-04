// src/auth/dev/dev.guard.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { DevAuthGuard } from './dev.guard';

describe('DevAuthGuard', () => {
  let guard: DevAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevAuthGuard],
    }).compile();

    guard = module.get<DevAuthGuard>(DevAuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
