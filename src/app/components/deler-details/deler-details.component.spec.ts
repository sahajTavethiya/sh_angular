import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelerDetailsComponent } from './deler-details.component';

describe('DelerDetailsComponent', () => {
  let component: DelerDetailsComponent;
  let fixture: ComponentFixture<DelerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelerDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
