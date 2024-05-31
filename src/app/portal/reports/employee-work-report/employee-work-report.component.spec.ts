import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWorkReportComponent } from './employee-work-report.component';

describe('EmployeeWorkReportComponent', () => {
  let component: EmployeeWorkReportComponent;
  let fixture: ComponentFixture<EmployeeWorkReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeWorkReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWorkReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
