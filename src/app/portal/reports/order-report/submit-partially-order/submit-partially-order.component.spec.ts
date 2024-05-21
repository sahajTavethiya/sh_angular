import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitPartiallyOrderComponent } from './submit-partially-order.component';

describe('SubmitPartiallyOrderComponent', () => {
  let component: SubmitPartiallyOrderComponent;
  let fixture: ComponentFixture<SubmitPartiallyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitPartiallyOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitPartiallyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
