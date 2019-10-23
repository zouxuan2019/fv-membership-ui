import { TestBed } from '@angular/core/testing';

import { AuthorizedPageBaseService } from './authorized-page-base.service';

describe('AuthorizedPageBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorizedPageBaseService = TestBed.get(AuthorizedPageBaseService);
    expect(service).toBeTruthy();
  });
});
