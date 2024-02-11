import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsByIdComponent } from './customer-details-by-id.component';

describe('CustomerDetailsByIdComponent', () => {
  let component: CustomerDetailsByIdComponent;
  let fixture: ComponentFixture<CustomerDetailsByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDetailsByIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerDetailsByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
