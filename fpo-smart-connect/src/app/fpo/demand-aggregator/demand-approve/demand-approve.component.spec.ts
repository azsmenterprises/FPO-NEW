import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandApproveComponent } from './demand-approve.component';

describe('DemandApproveComponent', () => {
  let component: DemandApproveComponent;
  let fixture: ComponentFixture<DemandApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
