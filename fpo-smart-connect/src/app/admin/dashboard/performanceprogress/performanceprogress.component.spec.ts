import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceprogressComponent } from './performanceprogress.component';

describe('PerformanceprogressComponent', () => {
  let component: PerformanceprogressComponent;
  let fixture: ComponentFixture<PerformanceprogressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceprogressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
