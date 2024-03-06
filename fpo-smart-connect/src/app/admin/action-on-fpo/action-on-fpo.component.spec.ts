import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionOnFpoComponent } from './action-on-fpo.component';

describe('ActionOnFpoComponent', () => {
  let component: ActionOnFpoComponent;
  let fixture: ComponentFixture<ActionOnFpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionOnFpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionOnFpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
