import { TestBed } from '@angular/core/testing';

import { FacebookService } from './facebook.service';

describe('FacebookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacebookService = TestBed.get(FacebookService);
    expect(service).toBeTruthy();
  });
});
