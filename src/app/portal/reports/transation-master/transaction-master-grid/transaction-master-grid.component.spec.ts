import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionMasterGridComponent } from './transaction-master-grid.component';

describe('TransactionMasterGridComponent', () => {
  let component: TransactionMasterGridComponent;
  let fixture: ComponentFixture<TransactionMasterGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionMasterGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionMasterGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
