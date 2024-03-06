import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogtableComponent } from './backlogtable.component';

describe('BacklogtableComponent', () => {
  let component: BacklogtableComponent;
  let fixture: ComponentFixture<BacklogtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BacklogtableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
