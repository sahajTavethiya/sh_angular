import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDealerCarListComponent } from './single-dealer-car-list.component';

describe('SingleDealerCarListComponent', () => {
  let component: SingleDealerCarListComponent;
  let fixture: ComponentFixture<SingleDealerCarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleDealerCarListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleDealerCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
