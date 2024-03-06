import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveConsumerComponent } from './approve-consumer.component';

describe('ApproveConsumerComponent', () => {
  let component: ApproveConsumerComponent;
  let fixture: ComponentFixture<ApproveConsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveConsumerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveConsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
