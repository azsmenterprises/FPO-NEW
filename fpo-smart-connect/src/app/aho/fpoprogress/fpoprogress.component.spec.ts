import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpoprogressComponent } from './fpoprogress.component';

describe('FpoprogressComponent', () => {
  let component: FpoprogressComponent;
  let fixture: ComponentFixture<FpoprogressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpoprogressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FpoprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
