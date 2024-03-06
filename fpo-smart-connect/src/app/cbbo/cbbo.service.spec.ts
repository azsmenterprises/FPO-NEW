import { TestBed } from '@angular/core/testing';

import { CbboService } from './cbbo.service';

describe('CbboService', () => {
  let service: CbboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
