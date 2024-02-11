import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelerCarDetailComponent } from './deler-car-detail.component';

describe('DelerCarDetailComponent', () => {
  let component: DelerCarDetailComponent;
  let fixture: ComponentFixture<DelerCarDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelerCarDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelerCarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
