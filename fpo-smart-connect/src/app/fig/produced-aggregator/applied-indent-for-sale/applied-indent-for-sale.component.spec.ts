import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedIndentForSaleComponent } from './applied-indent-for-sale.component';

describe('AppliedIndentForSaleComponent', () => {
  let component: AppliedIndentForSaleComponent;
  let fixture: ComponentFixture<AppliedIndentForSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedIndentForSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedIndentForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
