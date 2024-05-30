import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveMoneyToGridComponent } from './give-money-to-grid.component';

describe('GiveMoneyToGridComponent', () => {
  let component: GiveMoneyToGridComponent;
  let fixture: ComponentFixture<GiveMoneyToGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiveMoneyToGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveMoneyToGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
