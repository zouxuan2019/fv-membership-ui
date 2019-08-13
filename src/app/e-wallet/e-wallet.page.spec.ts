import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EWalletPage } from './e-wallet.page';

describe('EWalletPage', () => {
  let component: EWalletPage;
  let fixture: ComponentFixture<EWalletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EWalletPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EWalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
