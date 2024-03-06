import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedFarmersComponent } from './applied-farmers.component';

describe('AppliedFarmersComponent', () => {
  let component: AppliedFarmersComponent;
  let fixture: ComponentFixture<AppliedFarmersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedFarmersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedFarmersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
