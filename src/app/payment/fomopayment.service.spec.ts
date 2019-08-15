import { TestBed } from '@angular/core/testing';

import { FomopaymentService } from './fomopayment.service';

describe('FomopaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FomopaymentService = TestBed.get(FomopaymentService);
    expect(service).toBeTruthy();
  });
});
