import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerSubscriptionHistoryComponent } from './dealer-subscription-history.component';

describe('DealerSubscriptionHistoryComponent', () => {
  let component: DealerSubscriptionHistoryComponent;
  let fixture: ComponentFixture<DealerSubscriptionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealerSubscriptionHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DealerSubscriptionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
