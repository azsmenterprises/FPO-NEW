import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharecapitalComponent } from './sharecapital.component';

describe('SharecapitalComponent', () => {
  let component: SharecapitalComponent;
  let fixture: ComponentFixture<SharecapitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharecapitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharecapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
