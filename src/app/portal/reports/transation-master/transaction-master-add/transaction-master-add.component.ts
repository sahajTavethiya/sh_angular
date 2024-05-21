// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-transaction-master-add',
//   templateUrl: './transaction-master-add.component.html',
//   styleUrls: ['./transaction-master-add.component.scss']
// })
// export class TransactionMasterAddComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ConfirmationDialogComponent } from 'src/app/library/shared/confirmation-dialog/confirmation-dialog.component';
import { CustomerService } from '../../customer-master/customer.service';
import { TransactionMasterModel } from 'src/app/library/core/models/report/transactionMaster/transactionMaster.model';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
@Component({
  selector: 'app-transaction-master-add',
  templateUrl: './transaction-master-add.component.html',
  styleUrls: ['./transaction-master-add.component.scss'],
})
export class TransactionMasterAddComponent implements OnInit {
  requestForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    readonly formBuilder: RxFormBuilder,
    readonly dialog: MatDialog,
    private routeUrl: Router,
    public service: CustomerService
  ) {}
  moneySourceArr: any = [
    { KeyName: 1, DisplayText: 'Cash', CategoryName: 'MoneySourceMaster' },
  ];
  transactionTypeArr: any = [];
  TransactionForArr : any = [ { KeyName: 1, DisplayText: 'Cash', CategoryName: 'MoneySourceMaster' }];
  ClientArr : any = [];
  CustomerArr : any = [];
  CreditAmountFor : any = [];
  DebitAmountTypeArr : any = [];
  PaymentByMaster : any = [];
  PaymentToMaster : any = [];
  UserMaster : any = [];
  VendorMaster : any =[];
  ngOnInit(): void {
    this.bindDropdowns();
  }
  bindDropdowns() {
    // console.log(this.lookups);
    const categories = [
      this.service.constants.MasterCategories.MoneySourceMaster,
      this.service.constants.MasterCategories.TransactionTypeMaster,
      this.service.constants.MasterCategories.CreditAmountFor,
      this.service.constants.MasterCategories.ClientMaster,
      this.service.constants.MasterCategories.CustomerMaster,
      this.service.constants.MasterCategories.DebitAmountTypeMaster,
      this.service.constants.MasterCategories.UserMaster,
      this.service.constants.MasterCategories.VendorMaster
    ];
    this.service.getLookups(categories, (lookups: any) => {
      // console.log(JSON.stringify(lookups));
      if (lookups) {
        console.log('this is a lookups', lookups);
        this.moneySourceArr = lookups[this.service.constants.MasterCategories.MoneySourceMaster];
        this.transactionTypeArr = lookups[this.service.constants.MasterCategories.TransactionTypeMaster];
        this.CreditAmountFor = lookups[this.service.constants.MasterCategories.CreditAmountFor];
        this.ClientArr = lookups[this.service.constants.MasterCategories.ClientMaster];
        this.CustomerArr = lookups[this.service.constants.MasterCategories.CustomerMaster];
        this.DebitAmountTypeArr = lookups[this.service.constants.MasterCategories.DebitAmountTypeMaster];
        this.UserMaster = lookups[this.service.constants.MasterCategories.UserMaster];
        this.VendorMaster = lookups[this.service.constants.MasterCategories.VendorMaster];
      }
    });
    console.log('this is a MoneySource', this.moneySourceArr);
    console.log('this is a MoneySource', this.TransactionForArr);
    this.initial();
    // setTimeout(() => {
    //   this.initial();
    // }, 2000);
    // this.CityArr = this.lookups[this.service.constants.MasterCategories.CityMaster];
    // this.ZoneMasterArr = this.lookups[this.service.constants.MasterCategories.AllZoneMaster];
    // this.serviceNames = this.lookups[this.service.constants.MasterCategories.ServiceMaster];
    // this.TitleArr = this.lookups[this.service.constants.MasterCategories.CustomerTitle];
    // this.CustomerNameTypeArr = this.lookups[this.service.constants.MasterCategories.CustomerNameType];
    // this.OwnershipType = this.lookups[this.service.constants.MasterCategories.OwnershipType];
  }
  initial() {
    const RequestModel = new TransactionMasterModel(); // want to make new model for customer
    this.requestForm = this.formBuilder.formGroup(RequestModel);
    console.log('tihs is a arry', this.moneySourceArr);
  }
    setValueOfTransactionFor(){
    const container = this.requestForm.getRawValue();
    console.log(container);
    console.log("this is a clientMaster",this.ClientArr);
    if(container.transactionForId == 1 && container.transactionTypeId == 1){
      this.PaymentByMaster = this.ClientArr;
    }
    else if(container.transactionForId == 5 && container.transactionTypeId == 2){
      this.PaymentToMaster = this.UserMaster;
    }
    }
  changeTransactionType(){
    const container = this.requestForm.getRawValue();
    let TransactionTypeId = container.transactionTypeId;
    console.log("this is a transacionUd",container);
    if(TransactionTypeId == 1){
      this.TransactionForArr = this.CreditAmountFor
    }else if (TransactionTypeId == 2 ){
      this.TransactionForArr = this.DebitAmountTypeArr
    }
  }
  onSave() {
    if (this.requestForm.valid) {
      const container = this.requestForm.getRawValue();
      // if(container.deliveryAddress == null || container.deliveryAddress == ''){
      //   return this.service.notify.showSuccess("Please select Delivery Address.")
      // }
      console.log('Container --', container);
      // container.termsAndConditions = container.termsAndConditions.replace(/<\/?p>/g, '')
      let obj = {
        TransactionId:  0,
        TransactionType: container.transactionTypeId,
        SourceTypeId: container.moneySource,
        Amount: container.amount,
        Note : container.note,
        ExpenseTypeId: 0,//container.mobileNo,
        ClientId : null || -1,
        CustomerId : null || -1,
        VendorId : null || -1,
        EmployeeId : null
      };
      if(container.transactionForId == 1 && container.transactionTypeId == 1){
        obj.ClientId = container.paymentById
      }
      if(container.transactionForId == 2 && container.transactionTypeId == 2){
        obj.CustomerId = container.paymentById
      }
      if(container.transactionForId == 6 && container.transactionTypeId == 2){
        console.log("this is a TVendor");
        obj.VendorId = container.vendorId
      }
      if(container.transactionForId == 5 && container.transactionTypeId == 2){
        obj.EmployeeId = container.employeeId;
      }
      if(container.transactionTypeId == 2){
        obj.ExpenseTypeId = container.transactionForId
      }
      console.log("this is a obj",obj);
      
      /// want to call saveVendor api
      this.service.saveTransaction(obj).subscribe((response: any) => {
       console.log('this is response', response);

        if (response.status == 400) {
          this.service.notify.showError(response.message);
        } else if(response.status == 200){
          this.service.notify.showSuccess("Transaction Submit Successfully.");
          //  window.location.reload();;
        }
         this.routeUrl.navigate(['/Transaction']);
     });
    } else {
      console.log('form is not valide.');
    }
  }

  onCancel(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        header: 'Confirmation',
        message: 'Do you want to cancel your changes?',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.routeUrl.navigate(['/PurchaseOrder']);
      }
    });
  }
}
