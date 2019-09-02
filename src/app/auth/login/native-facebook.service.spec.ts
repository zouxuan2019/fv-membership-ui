import { TestBed } from '@angular/core/testing';

import { NativeFacebookService } from './native-facebook.service';

describe('NativeFacebookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NativeFacebookService = TestBed.get(NativeFacebookService);
    expect(service).toBeTruthy();
  });
});
