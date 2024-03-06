import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelevantConsumerGroupsComponent } from './relevant-consumer-groups.component';

describe('RelevantConsumerGroupsComponent', () => {
  let component: RelevantConsumerGroupsComponent;
  let fixture: ComponentFixture<RelevantConsumerGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelevantConsumerGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelevantConsumerGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
