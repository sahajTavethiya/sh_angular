import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionMasterAddComponent } from './transaction-master-add.component';

describe('TransactionMasterAddComponent', () => {
  let component: TransactionMasterAddComponent;
  let fixture: ComponentFixture<TransactionMasterAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionMasterAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionMasterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
