import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallscenarioComponent } from './overallscenario.component';

describe('OverallscenarioComponent', () => {
  let component: OverallscenarioComponent;
  let fixture: ComponentFixture<OverallscenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallscenarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallscenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
