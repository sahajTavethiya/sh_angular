import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { AddDropDownModel } from 'src/app/library/core/models/report/lookupMaster/AddDropDownValues.model';
import { ConfirmationDialogComponent } from 'src/app/library/shared/confirmation-dialog/confirmation-dialog.component';
import { VendorService } from '../vendor.service';
import { AddVendorDownModel } from 'src/app/library/core/models/report/VendorMaster/AddVendor.model';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.scss']
})
export class VendorDetailComponent implements OnInit {
  requestForm: FormGroup;
  showSubmitButton = false;
  constructor(private fb: FormBuilder, readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog, private routeUrl: Router,public service : VendorService,readonly authService: AuthService,) { 
    const RequestModel = new AddVendorDownModel();
    this.requestForm= this.formBuilder.formGroup(RequestModel);
  }
  Lookups:any;
  ActiveMaster:any
  ngOnInit(): void {
    this.bindDropdowns()
    this.authService.GetRolePermissions().subscribe((response:any)=>{
      console.log("this is a response",response.data.result);

     this.showSubmitButton = response.data.result.find((obj: any) => obj.resourceId == environment.ResourceMasterIds.VendorMaster)?.canUpdate;
   })
  }
  bindDropdowns() {
    const categories = [
      this.service.constants.MasterCategories.ActiveMaster

    ];
    this.service.getLookups(categories, (lookups:any) => {
       this.Lookups = lookups;
      // this.initialize();
      console.log("this is a Lokkups",lookups);
      this.ActiveMaster = lookups[this.service.constants.MasterCategories.ActiveMaster];
     

    });
  }
  onSave() {
    if (this.requestForm.valid) {
      const container = this.requestForm.getRawValue();

      // if(container.deliveryAddress == null || container.deliveryAddress == ''){
      //   return this.service.notify.showSuccess("Please select Delivery Address.")
      // }

      console.log("Container --", container);
      // container.termsAndConditions = container.termsAndConditions.replace(/<\/?p>/g, '')

      let ReqObj = {
        VendorId : 0,
        VendorName : container.name, 
        EmailId : container.email, 
        Address : container.address, 
        MobileNo : container.mobileNo, 
        IsActive : container.isActive, 
      }
/// want to call saveVendor api 
      this.service.saveVendor(ReqObj).subscribe((response: any) => {
        console.log("this is response",response);
        
         if(response.data.statusCode == 400){
          this.service.notify.showError(response.message)
         }else{
          this.service.notify.showSuccess(response.data.StatusDescription)
          // window.location.reload();;
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
        this.routeUrl.navigate(['/Vendor']);
      }
    });
  }
}

