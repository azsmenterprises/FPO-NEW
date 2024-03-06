import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentSaleComponent } from './indent-sale.component';

describe('IndentSaleComponent', () => {
  let component: IndentSaleComponent;
  let fixture: ComponentFixture<IndentSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndentSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
