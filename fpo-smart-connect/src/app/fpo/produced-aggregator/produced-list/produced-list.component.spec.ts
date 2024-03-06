import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducedListComponent } from './produced-list.component';

describe('ProducedListComponent', () => {
  let component: ProducedListComponent;
  let fixture: ComponentFixture<ProducedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
