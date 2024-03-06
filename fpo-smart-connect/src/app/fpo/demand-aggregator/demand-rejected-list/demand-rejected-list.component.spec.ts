import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandRejectedListComponent } from './demand-rejected-list.component';

describe('DemandRejectedListComponent', () => {
  let component: DemandRejectedListComponent;
  let fixture: ComponentFixture<DemandRejectedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandRejectedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandRejectedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
