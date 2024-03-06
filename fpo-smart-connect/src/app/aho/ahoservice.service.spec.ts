import { TestBed } from '@angular/core/testing';

import { AhoserviceService } from './ahoservice.service';

describe('AhoserviceService', () => {
  let service: AhoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AhoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
