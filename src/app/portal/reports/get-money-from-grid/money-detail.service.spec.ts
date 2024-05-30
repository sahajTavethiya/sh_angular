import { TestBed } from '@angular/core/testing';

import { MoneyDetailService } from './money-detail.service';

describe('MoneyDetailService', () => {
  let service: MoneyDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoneyDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
