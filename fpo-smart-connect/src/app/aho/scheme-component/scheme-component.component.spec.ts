import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeComponentComponent } from './scheme-component.component';

describe('SchemeComponentComponent', () => {
  let component: SchemeComponentComponent;
  let fixture: ComponentFixture<SchemeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemeComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
