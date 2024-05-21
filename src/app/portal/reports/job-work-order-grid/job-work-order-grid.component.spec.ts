import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobWorkOrderGridComponent } from './job-work-order-grid.component';

describe('JobWorkOrderGridComponent', () => {
  let component: JobWorkOrderGridComponent;
  let fixture: ComponentFixture<JobWorkOrderGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobWorkOrderGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobWorkOrderGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
