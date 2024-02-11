import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCustomerDetailComponent } from './single-customer-detail.component';

describe('SingleCustomerDetailComponent', () => {
  let component: SingleCustomerDetailComponent;
  let fixture: ComponentFixture<SingleCustomerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCustomerDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleCustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
