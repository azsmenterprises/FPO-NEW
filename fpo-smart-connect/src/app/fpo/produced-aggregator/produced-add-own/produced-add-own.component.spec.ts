import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducedAddOwnComponent } from './produced-add-own.component';

describe('ProducedAddOwnComponent', () => {
  let component: ProducedAddOwnComponent;
  let fixture: ComponentFixture<ProducedAddOwnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducedAddOwnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducedAddOwnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
