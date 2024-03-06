import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingreportComponent } from './missingreport.component';

describe('MissingreportComponent', () => {
  let component: MissingreportComponent;
  let fixture: ComponentFixture<MissingreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissingreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
