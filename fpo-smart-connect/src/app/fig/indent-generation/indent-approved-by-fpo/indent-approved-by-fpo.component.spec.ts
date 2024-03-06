import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentApprovedByFpoComponent } from './indent-approved-by-fpo.component';

describe('IndentApprovedByFpoComponent', () => {
  let component: IndentApprovedByFpoComponent;
  let fixture: ComponentFixture<IndentApprovedByFpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndentApprovedByFpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentApprovedByFpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
