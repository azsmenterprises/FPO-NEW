import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcefullyFpoProfileUpdateDialogComponent } from './forcefully-fpo-profile-update-dialog.component';

describe('ForcefullyFpoProfileUpdateDialogComponent', () => {
  let component: ForcefullyFpoProfileUpdateDialogComponent;
  let fixture: ComponentFixture<ForcefullyFpoProfileUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForcefullyFpoProfileUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcefullyFpoProfileUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
