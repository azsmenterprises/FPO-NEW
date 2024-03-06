import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedConsumersComponent } from './approved-consumers.component';

describe('ApprovedConsumersComponent', () => {
  let component: ApprovedConsumersComponent;
  let fixture: ComponentFixture<ApprovedConsumersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedConsumersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedConsumersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
