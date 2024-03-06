import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedFigsComponent } from './applied-figs.component';

describe('AppliedFigsComponent', () => {
  let component: AppliedFigsComponent;
  let fixture: ComponentFixture<AppliedFigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedFigsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedFigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
