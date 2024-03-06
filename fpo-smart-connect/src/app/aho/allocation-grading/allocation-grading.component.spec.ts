import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationGradingComponent } from './allocation-grading.component';

describe('AllocationGradingComponent', () => {
  let component: AllocationGradingComponent;
  let fixture: ComponentFixture<AllocationGradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocationGradingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationGradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
