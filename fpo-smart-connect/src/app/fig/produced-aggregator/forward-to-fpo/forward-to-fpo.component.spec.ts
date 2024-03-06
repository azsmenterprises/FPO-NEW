import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardToFpoComponent } from './forward-to-fpo.component';

describe('ForwardToFpoComponent', () => {
  let component: ForwardToFpoComponent;
  let fixture: ComponentFixture<ForwardToFpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForwardToFpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardToFpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
