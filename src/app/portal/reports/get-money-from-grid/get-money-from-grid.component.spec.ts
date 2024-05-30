import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMoneyFromGridComponent } from './get-money-from-grid.component';

describe('GetMoneyFromGridComponent', () => {
  let component: GetMoneyFromGridComponent;
  let fixture: ComponentFixture<GetMoneyFromGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetMoneyFromGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMoneyFromGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
