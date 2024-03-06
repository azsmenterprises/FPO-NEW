import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetvsachievmentComponent } from './targetvsachievment.component';

describe('TargetvsachievmentComponent', () => {
  let component: TargetvsachievmentComponent;
  let fixture: ComponentFixture<TargetvsachievmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetvsachievmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetvsachievmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
