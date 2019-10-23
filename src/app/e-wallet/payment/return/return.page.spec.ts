import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnPage } from './return.page';

describe('ReturnPage', () => {
  let component: ReturnPage;
  let fixture: ComponentFixture<ReturnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
