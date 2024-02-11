import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCarListComponent } from './active-car-list.component';

describe('ActiveCarListComponent', () => {
  let component: ActiveCarListComponent;
  let fixture: ComponentFixture<ActiveCarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveCarListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
