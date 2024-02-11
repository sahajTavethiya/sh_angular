import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerInquiryComponent } from './dealer-inquiry.component';

describe('DealerInquiryComponent', () => {
  let component: DealerInquiryComponent;
  let fixture: ComponentFixture<DealerInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealerInquiryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DealerInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
