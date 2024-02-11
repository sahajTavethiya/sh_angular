import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndCondtionComponent } from './terms-and-condtion.component';

describe('TermsAndCondtionComponent', () => {
  let component: TermsAndCondtionComponent;
  let fixture: ComponentFixture<TermsAndCondtionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsAndCondtionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermsAndCondtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
