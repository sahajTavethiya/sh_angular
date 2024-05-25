import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourntPageComponent } from './fournt-page.component';

describe('FourntPageComponent', () => {
  let component: FourntPageComponent;
  let fixture: ComponentFixture<FourntPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourntPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FourntPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
