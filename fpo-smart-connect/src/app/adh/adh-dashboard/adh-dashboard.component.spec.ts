import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhDashboardComponent } from './adh-dashboard.component';

describe('AdhDashboardComponent', () => {
  let component: AdhDashboardComponent;
  let fixture: ComponentFixture<AdhDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdhDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
