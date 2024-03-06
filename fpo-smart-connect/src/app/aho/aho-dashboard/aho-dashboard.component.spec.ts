import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhoDashboardComponent } from './aho-dashboard.component';

describe('AhoDashboardComponent', () => {
  let component: AhoDashboardComponent;
  let fixture: ComponentFixture<AhoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AhoDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AhoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
