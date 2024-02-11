import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInventoryComponent } from './car-inventory.component';

describe('CarInventoryComponent', () => {
  let component: CarInventoryComponent;
  let fixture: ComponentFixture<CarInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarInventoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
