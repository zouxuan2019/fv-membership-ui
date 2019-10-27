import { TestBed } from '@angular/core/testing';

import { EWalletService } from './e-wallet.service';

describe('EWalletService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EWalletService = TestBed.get(EWalletService);
    expect(service).toBeTruthy();
  });
});
