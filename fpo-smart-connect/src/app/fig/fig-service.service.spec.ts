import { TestBed } from '@angular/core/testing';

import { FigServiceService } from './fig-service.service';

describe('FigServiceService', () => {
  let service: FigServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FigServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
