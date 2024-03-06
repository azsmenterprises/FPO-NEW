import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpotargetsComponent } from './fpotargets.component';

describe('FpotargetsComponent', () => {
  let component: FpotargetsComponent;
  let fixture: ComponentFixture<FpotargetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpotargetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FpotargetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
