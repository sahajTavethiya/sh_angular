import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobWorkBasicOrderComponent } from './job-work-basic-order.component';

describe('JobWorkBasicOrderComponent', () => {
  let component: JobWorkBasicOrderComponent;
  let fixture: ComponentFixture<JobWorkBasicOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobWorkBasicOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobWorkBasicOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
