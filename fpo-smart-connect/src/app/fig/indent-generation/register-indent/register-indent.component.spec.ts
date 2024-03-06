import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterIndentComponent } from './register-indent.component';

describe('RegisterIndentComponent', () => {
  let component: RegisterIndentComponent;
  let fixture: ComponentFixture<RegisterIndentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterIndentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
