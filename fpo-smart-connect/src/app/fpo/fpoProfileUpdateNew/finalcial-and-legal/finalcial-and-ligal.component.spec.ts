import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalcialAndLigalComponent } from './finalcial-and-ligal.component';

describe('FinalcialAndLigalComponent', () => {
  let component: FinalcialAndLigalComponent;
  let fixture: ComponentFixture<FinalcialAndLigalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalcialAndLigalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalcialAndLigalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
