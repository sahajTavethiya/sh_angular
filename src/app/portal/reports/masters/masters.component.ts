import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { AddDropDownModel } from 'src/app/library/core/models/report/lookupMaster/AddDropDownValues.model';
import { ConfirmationDialogComponent } from 'src/app/library/shared/confirmation-dialog/confirmation-dialog.component';
import { MastersService } from './masters.service';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss']
})
export class MastersComponent implements OnInit {
  requestForm: FormGroup;
  constructor(private fb: FormBuilder, readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog, private routeUrl: Router,public service : MastersService) { 
    const RequestModel = new AddDropDownModel();
    this.requestForm= this.formBuilder.formGroup(RequestModel);
  }

  ngOnInit(): void {
  }
  onSave() {
    if (this.requestForm.valid) {
      const container = this.requestForm.getRawValue();
      console.log(container)
      if (container.hsn_Code !== null && container.percentage == null) {
        return this.service.notify.showSuccess("Please Enter Percentage.")
      }

      // if(container.deliveryAddress == null || container.deliveryAddress == ''){
      //   return this.service.notify.showSuccess("Please select Delivery Address.")
      // }

      console.log("Container --", container);
      // container.termsAndConditions = container.termsAndConditions.replace(/<\/?p>/g, '')

      let obj = {
        purchaseId: container.id || 0,
      };

      this.service.addDetailOFMasters(container).subscribe((response: any) => {
        console.log("this is response",response);
        
         if(response.data.statusCode == 400){
          this.service.notify.showError(response.message)
         }else{
          this.service.notify.showSuccess(response.data.StatusDescription)
          window.location.reload();;
        }
        //this.routeUrl.navigate(['/PurchaseOrder']);
      });
    } else {
      console.log("form is not valide.")
    }
  }

  onCancel(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        header: "Confirmation",
        message: "Do you want to cancel your changes?"
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.routeUrl.navigate(['/PurchaseOrder']);
      }
    });
  }
}
