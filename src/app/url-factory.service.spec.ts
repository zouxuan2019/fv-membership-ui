import { TestBed } from '@angular/core/testing';

import { UrlFactoryService } from './url-factory.service';

describe('UrlFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrlFactoryService = TestBed.get(UrlFactoryService);
    expect(service).toBeTruthy();
  });
});
