import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigsApprovedComponent } from './figs-approved.component';

describe('FigsApprovedComponent', () => {
  let component: FigsApprovedComponent;
  let fixture: ComponentFixture<FigsApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FigsApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FigsApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
