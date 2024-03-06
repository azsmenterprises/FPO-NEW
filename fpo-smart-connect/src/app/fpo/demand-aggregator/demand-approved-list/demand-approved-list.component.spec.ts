import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandApprovedListComponent } from './demand-approved-list.component';

describe('DemandApprovedListComponent', () => {
  let component: DemandApprovedListComponent;
  let fixture: ComponentFixture<DemandApprovedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandApprovedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandApprovedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
