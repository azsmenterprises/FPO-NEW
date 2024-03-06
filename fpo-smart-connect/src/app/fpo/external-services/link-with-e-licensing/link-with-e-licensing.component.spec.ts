import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkWithELicensingComponent } from './link-with-e-licensing.component';

describe('LinkWithELicensingComponent', () => {
  let component: LinkWithELicensingComponent;
  let fixture: ComponentFixture<LinkWithELicensingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkWithELicensingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkWithELicensingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
