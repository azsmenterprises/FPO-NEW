import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelevantTraderComponent } from './relevant-trader.component';

describe('RelevantTraderComponent', () => {
  let component: RelevantTraderComponent;
  let fixture: ComponentFixture<RelevantTraderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelevantTraderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelevantTraderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
