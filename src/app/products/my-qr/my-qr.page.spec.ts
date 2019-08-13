import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQrPage } from './my-qr.page';

describe('MyQrPage', () => {
  let component: MyQrPage;
  let fixture: ComponentFixture<MyQrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyQrPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
