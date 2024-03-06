import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgDashboardComponent } from './cg-dashboard.component';

describe('CgDashboardComponent', () => {
  let component: CgDashboardComponent;
  let fixture: ComponentFixture<CgDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CgDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CgDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
