import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationaltargetsComponent } from './operationaltargets.component';

describe('OperationaltargetsComponent', () => {
  let component: OperationaltargetsComponent;
  let fixture: ComponentFixture<OperationaltargetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationaltargetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationaltargetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
