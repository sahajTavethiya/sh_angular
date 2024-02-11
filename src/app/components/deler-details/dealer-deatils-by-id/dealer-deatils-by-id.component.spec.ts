import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerDeatilsByIdComponent } from './dealer-deatils-by-id.component';

describe('DealerDeatilsByIdComponent', () => {
  let component: DealerDeatilsByIdComponent;
  let fixture: ComponentFixture<DealerDeatilsByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealerDeatilsByIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DealerDeatilsByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
