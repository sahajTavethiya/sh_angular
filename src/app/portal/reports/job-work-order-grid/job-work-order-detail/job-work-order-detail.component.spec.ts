import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobWorkOrderDetailComponent } from './job-work-order-detail.component';

describe('JobWorkOrderDetailComponent', () => {
  let component: JobWorkOrderDetailComponent;
  let fixture: ComponentFixture<JobWorkOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobWorkOrderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobWorkOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
