import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksReportComponent } from './stocks-report.component';

describe('StocksReportComponent', () => {
  let component: StocksReportComponent;
  let fixture: ComponentFixture<StocksReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocksReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
