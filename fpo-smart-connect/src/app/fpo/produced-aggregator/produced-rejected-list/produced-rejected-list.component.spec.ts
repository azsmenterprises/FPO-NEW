import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducedRejectedListComponent } from './produced-rejected-list.component';

describe('ProducedRejectedListComponent', () => {
  let component: ProducedRejectedListComponent;
  let fixture: ComponentFixture<ProducedRejectedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducedRejectedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducedRejectedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
