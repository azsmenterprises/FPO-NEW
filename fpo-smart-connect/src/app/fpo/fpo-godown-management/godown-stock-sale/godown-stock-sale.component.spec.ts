import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GodownStockSaleComponent } from './godown-stock-sale.component';

describe('GodownStockSaleComponent', () => {
  let component: GodownStockSaleComponent;
  let fixture: ComponentFixture<GodownStockSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GodownStockSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GodownStockSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
