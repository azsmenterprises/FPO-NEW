import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveFigsComponent } from './approve-figs.component';

describe('ApproveFigsComponent', () => {
  let component: ApproveFigsComponent;
  let fixture: ComponentFixture<ApproveFigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveFigsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveFigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
