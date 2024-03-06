import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogForSaleComponent } from './dialog-for-sale.component';

describe('DialogForSaleComponent', () => {
  let component: DialogForSaleComponent;
  let fixture: ComponentFixture<DialogForSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogForSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
