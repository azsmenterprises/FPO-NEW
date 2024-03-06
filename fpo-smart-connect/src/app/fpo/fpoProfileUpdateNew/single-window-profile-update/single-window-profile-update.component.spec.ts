import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleWindowProfileUpdateComponent } from './single-window-profile-update.component';

describe('SingleWindowProfileUpdateComponent', () => {
  let component: SingleWindowProfileUpdateComponent;
  let fixture: ComponentFixture<SingleWindowProfileUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleWindowProfileUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleWindowProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
