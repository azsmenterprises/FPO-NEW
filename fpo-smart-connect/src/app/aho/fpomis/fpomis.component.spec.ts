import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpomisComponent } from './fpomis.component';

describe('FpomisComponent', () => {
  let component: FpomisComponent;
  let fixture: ComponentFixture<FpomisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpomisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FpomisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
