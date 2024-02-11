import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDealerDetailComponent } from './single-dealer-detail.component';

describe('SingleDealerDetailComponent', () => {
  let component: SingleDealerDetailComponent;
  let fixture: ComponentFixture<SingleDealerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleDealerDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleDealerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
