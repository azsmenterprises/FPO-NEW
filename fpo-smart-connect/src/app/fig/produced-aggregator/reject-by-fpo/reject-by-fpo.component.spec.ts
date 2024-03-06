import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectByFpoComponent } from './reject-by-fpo.component';

describe('RejectByFpoComponent', () => {
  let component: RejectByFpoComponent;
  let fixture: ComponentFixture<RejectByFpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectByFpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectByFpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
