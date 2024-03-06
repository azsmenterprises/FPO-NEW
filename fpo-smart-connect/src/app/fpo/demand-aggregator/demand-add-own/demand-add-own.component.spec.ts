import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandAddOwnComponent } from './demand-add-own.component';

describe('DemandAddOwnComponent', () => {
  let component: DemandAddOwnComponent;
  let fixture: ComponentFixture<DemandAddOwnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandAddOwnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandAddOwnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
