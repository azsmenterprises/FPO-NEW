import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentRejectedByFpoComponent } from './indent-rejected-by-fpo.component';

describe('IndentRejectedByFpoComponent', () => {
  let component: IndentRejectedByFpoComponent;
  let fixture: ComponentFixture<IndentRejectedByFpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndentRejectedByFpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentRejectedByFpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
