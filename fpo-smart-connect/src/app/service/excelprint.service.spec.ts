import { TestBed } from '@angular/core/testing';

import { ExcelprintService } from './excelprint.service';

describe('ExcelprintService', () => {
  let service: ExcelprintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelprintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
