import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectbackComponent } from './connectback.component';

describe('ConnectbackComponent', () => {
  let component: ConnectbackComponent;
  let fixture: ComponentFixture<ConnectbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
