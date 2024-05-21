import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitPartiallyOrderPopUpComponent } from './submit-partially-order-pop-up.component';

describe('SubmitPartiallyOrderPopUpComponent', () => {
  let component: SubmitPartiallyOrderPopUpComponent;
  let fixture: ComponentFixture<SubmitPartiallyOrderPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitPartiallyOrderPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitPartiallyOrderPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
