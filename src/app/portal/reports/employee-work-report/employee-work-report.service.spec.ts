import { TestBed } from '@angular/core/testing';
import { EmployeeWorkReportService } from './employee-work-report.service';

describe('EmployeeWorkReportService', () => {
  let service: EmployeeWorkReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeWorkReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
