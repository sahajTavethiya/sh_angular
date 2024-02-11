import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInquiryComponent } from './car-inquiry.component';

describe('CarInquiryComponent', () => {
  let component: CarInquiryComponent;
  let fixture: ComponentFixture<CarInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarInquiryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
