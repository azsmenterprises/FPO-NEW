import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducedApproveComponent } from './produced-approve.component';

describe('ProducedApproveComponent', () => {
  let component: ProducedApproveComponent;
  let fixture: ComponentFixture<ProducedApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducedApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducedApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
