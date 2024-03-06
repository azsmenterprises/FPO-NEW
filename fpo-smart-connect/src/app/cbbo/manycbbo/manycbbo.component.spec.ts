import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManycbboComponent } from './manycbbo.component';

describe('ManycbboComponent', () => {
  let component: ManycbboComponent;
  let fixture: ComponentFixture<ManycbboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManycbboComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManycbboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
