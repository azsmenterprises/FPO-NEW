import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpoCbboTargetsComponent } from './fpo-cbbo-targets.component';

describe('FpoCbboTargetsComponent', () => {
  let component: FpoCbboTargetsComponent;
  let fixture: ComponentFixture<FpoCbboTargetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpoCbboTargetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FpoCbboTargetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
