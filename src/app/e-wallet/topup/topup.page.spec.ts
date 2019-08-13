import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupPage } from './topup.page';

describe('TopupPage', () => {
  let component: TopupPage;
  let fixture: ComponentFixture<TopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
