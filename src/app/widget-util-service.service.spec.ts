import { TestBed } from '@angular/core/testing';

import { WidgetUtilServiceService } from './widget-util-service.service';

describe('WidgetUtilServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WidgetUtilServiceService = TestBed.get(WidgetUtilServiceService);
    expect(service).toBeTruthy();
  });
});
