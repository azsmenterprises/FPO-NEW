import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomeninboardComponent } from './womeninboard.component';

describe('WomeninboardComponent', () => {
  let component: WomeninboardComponent;
  let fixture: ComponentFixture<WomeninboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WomeninboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WomeninboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
