import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringtoolComponent } from './scoringtool.component';

describe('ScoringtoolComponent', () => {
  let component: ScoringtoolComponent;
  let fixture: ComponentFixture<ScoringtoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoringtoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoringtoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
