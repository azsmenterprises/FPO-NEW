import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpoUpdateComponent } from './fpo-update.component';

describe('FpoUpdateComponent', () => {
  let component: FpoUpdateComponent;
  let fixture: ComponentFixture<FpoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpoUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FpoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
