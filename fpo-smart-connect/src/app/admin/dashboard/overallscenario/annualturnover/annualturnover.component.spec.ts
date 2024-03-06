import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualturnoverComponent } from './annualturnover.component';

describe('AnnualturnoverComponent', () => {
  let component: AnnualturnoverComponent;
  let fixture: ComponentFixture<AnnualturnoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualturnoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualturnoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
