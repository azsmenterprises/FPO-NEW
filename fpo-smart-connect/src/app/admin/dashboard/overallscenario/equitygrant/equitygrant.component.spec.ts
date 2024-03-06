import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquitygrantComponent } from './equitygrant.component';

describe('EquitygrantComponent', () => {
  let component: EquitygrantComponent;
  let fixture: ComponentFixture<EquitygrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquitygrantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquitygrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
