import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitStatusComponent } from './transit-status.component';

describe('TransitStatusComponent', () => {
  let component: TransitStatusComponent;
  let fixture: ComponentFixture<TransitStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransitStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
