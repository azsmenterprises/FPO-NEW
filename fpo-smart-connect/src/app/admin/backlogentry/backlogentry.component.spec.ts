import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogentryComponent } from './backlogentry.component';

describe('BacklogentryComponent', () => {
  let component: BacklogentryComponent;
  let fixture: ComponentFixture<BacklogentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BacklogentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
