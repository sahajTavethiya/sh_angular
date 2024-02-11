import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtivatePolicyComponent } from './ptivate-policy.component';

describe('PtivatePolicyComponent', () => {
  let component: PtivatePolicyComponent;
  let fixture: ComponentFixture<PtivatePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtivatePolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PtivatePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
