import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetachievementComponent } from './targetachievement.component';

describe('TargetachievementComponent', () => {
  let component: TargetachievementComponent;
  let fixture: ComponentFixture<TargetachievementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetachievementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetachievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
