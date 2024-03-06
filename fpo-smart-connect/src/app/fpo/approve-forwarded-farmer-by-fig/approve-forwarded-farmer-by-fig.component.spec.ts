import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveForwardedFarmerByFigComponent } from './approve-forwarded-farmer-by-fig.component';

describe('ApproveForwardedFarmerByFigComponent', () => {
  let component: ApproveForwardedFarmerByFigComponent;
  let fixture: ComponentFixture<ApproveForwardedFarmerByFigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveForwardedFarmerByFigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveForwardedFarmerByFigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
