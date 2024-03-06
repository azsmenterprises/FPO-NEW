import { TestBed } from '@angular/core/testing';

import { RootAdminService } from './root-admin.service';

describe('RootAdminService', () => {
  let service: RootAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RootAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
