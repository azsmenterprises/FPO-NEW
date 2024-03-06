import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelevantFposComponent } from './relevant-fpos.component';

describe('RelevantFposComponent', () => {
  let component: RelevantFposComponent;
  let fixture: ComponentFixture<RelevantFposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelevantFposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelevantFposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
