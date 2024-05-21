import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { AddDropDownModel } from 'src/app/library/core/models/report/lookupMaster/AddDropDownValues.model';
import { ConfirmationDialogComponent } from 'src/app/library/shared/confirmation-dialog/confirmation-dialog.component';
import { AddVendorDownModel } from 'src/app/library/core/models/report/VendorMaster/AddVendor.model';
import { CustomerService } from '../customer.service';
@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit {
  requestForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    readonly formBuilder: RxFormBuilder,
    readonly dialog: MatDialog,
    private routeUrl: Router,
    public service: CustomerService
  ) {
    const RequestModel = new AddVendorDownModel(); // want to make new model for customer
    this.requestForm = this.formBuilder.formGroup(RequestModel);
  }

  ngOnInit(): void {}
  onSave() {
    if (this.requestForm.valid) {
      const container = this.requestForm.getRawValue();

      // if(container.deliveryAddress == null || container.deliveryAddress == ''){
      //   return this.service.notify.showSuccess("Please select Delivery Address.")
      // }

      console.log('Container --', container);
      // container.termsAndConditions = container.termsAndConditions.replace(/<\/?p>/g, '')

      let obj = {
        CustomerId : container.customerID | 0 ,
        CustomerName: container.name,
        EmailId: container.email,
        Address: container.address,
        MobileNo: container.mobileNo,
        BankName: container.bankName,
        GST_No: container.GST_No,
        Account_Name: container.account_Name,
        AccountNo: container.accountNo,
        IFSC_No: container.IFSC_No,
        IsActive: container.isActive,
        CreatedBy: container.createdBy,
      };
      /// want to call saveVendor api
      this.service.saveCustomer(obj).subscribe((response: any) => {
        console.log("this is response",response);

         if(response.data.statusCode == 400){
          this.service.notify.showError(response.message)
         }else{
          this.service.notify.showSuccess(response.data.StatusDescription)
        //  window.location.reload();;
        }
        this.routeUrl.navigate(['/Customer']);
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
