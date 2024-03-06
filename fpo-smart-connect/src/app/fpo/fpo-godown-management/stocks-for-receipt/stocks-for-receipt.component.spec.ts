import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksForReceiptComponent } from './stocks-for-receipt.component';

describe('StocksForReceiptComponent', () => {
  let component: StocksForReceiptComponent;
  let fixture: ComponentFixture<StocksForReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksForReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksForReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
