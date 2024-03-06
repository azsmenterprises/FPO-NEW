import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedByFpoComponent } from './approved-by-fpo.component';

describe('ApprovedByFpoComponent', () => {
  let component: ApprovedByFpoComponent;
  let fixture: ComponentFixture<ApprovedByFpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedByFpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedByFpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
