import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OrderReportServiceService } from '../order-report-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { AddOrderBasicDetail } from 'src/app/library/core/models/add-order-basic-detail.model';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  requestForm: FormGroup;
  addForm: FormGroup;
  requestId: number;
  IsAddOrderForm = false;
  OrderReportDetailLookups: any;
  constructor(readonly service: OrderReportServiceService,
    readonly route: ActivatedRoute,
    readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog, readonly authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.requestId = this.route.snapshot.params.id;
    this.bindDropdowns();
  }

  bindDropdowns() {
    const categories = [
      this.service.constants.MasterCategories.RoleMaster,
      this.service.constants.MasterCategories.ClientMaster,
      this.service.constants.MasterCategories.WorkTypeMaster,
      this.service.constants.MasterCategories.ProductMaster,
      this.service.constants.MasterCategories.SizeMaster,
      this.service.constants.MasterCategories.DesignMaster,
      this.service.constants.MasterCategories.StatusMaster,
      this.service.constants.OrderReportCategories.HSN_Master,
      this.service.constants.OrderReportCategories.MeasurementCategory,
      this.service.constants.OrderReportCategories.VendorMaster
      ];
    this.service.getLookups(categories, (lookups: any) => {
      this.OrderReportDetailLookups = lookups;
    });
    this.initialize();
  }
  obj: any;
  currentPath:any
  initialize() {
    this.currentPath = this.route.snapshot.url.join('/');
    if(this.currentPath === "OrderReportDetail"){
      this.IsAddOrderForm = true;
    }
    console.log(this.IsAddOrderForm)
    if (this.requestId) {
      let obj = {
        "OrderId": this.requestId
      }  
      this.service.getOrderDetailById(obj).subscribe((response: any) => {
        if (response.status === 200 && response.data) {
          let obj = {
            WorkTypeId : response.data.resData1[0].WorkTypeId,
            DesignId : response.data.resData1[0].DesignId || null,
            ClientId : response.data.resData1[0].ClientId || null,
            ProductId : response.data.resData1[0].ProductId || null,
            SizeId : response.data.resData1[0].SizeId || null,
            BillNo : response.data.resData1[0].BillNo || null,
            TotalItem : response.data.resData1[0].TotalItem || null,
            AmountPerOneItem : response.data.resData1[0].AmountPerOneItem || null,
            HSN_Code : response.data.resData1[0].HSN_Code || null,
            Qty : response.data.resData1[0].Qty,
            UOM : response.data.resData1[0].UOM || null,
            StatusId : response.data.resData1[0].StatusId || 1,
            Vendor : response.data.resData1[0].Vendor || null,
            SubmitPartiallyOrderModel : response.data.resData1.length > 1 ? response.data.resData1.shift() : [] // want to change as response
          
          }
          if(obj.WorkTypeId == environment.ManufactureWorkTypeId){
            this.IsAddOrderForm = true;
          }
            // response.data.resData1.shift();
            // this.obj.SubmitPartiallyOrderModel = response.data.resData1;
          const requestContainer = new AddOrderBasicDetail(obj);
          this.requestForm = this.formBuilder.formGroup(requestContainer);
          console.log( "this is 123",this.requestForm);
        };
      });
    } else {
      const requestContainer = new AddOrderBasicDetail();
      this.requestForm = this.formBuilder.formGroup(requestContainer);
    }
  }
  saveNotes() {
    
  }
  onCancel() {
    this.router.navigate(['/OrderReport'])
  }
  onSave() {
    if (this.requestForm.valid) {
      const container = this.requestForm.getRawValue();
      console.log("this is a container", container);
      let ReqObj = {
        OrderId : this.requestId,
        WorkTypeId:container.WorkTypeId,
        ClientId:container.ClientId,
        DesignId:container.DesignId,
        TotalItem:container.TotalItem,
        AmountPerOneItem:container.AmountPerOneItem,
        ProductId:container.ProductId,
        HSN_Code:container.HSN_Code,
        BillNo:container.BillNo,
        ImageName:container.ImageName,
        SizeId:container.SizeId,
        StatusId:container.StatusId,
        Qty:container.Qty,
        UOM:container.UOM,
        Vendor:container.Vendor,
        SubmitPartiallyOrderModel:container.SubmitPartiallyOrderModel 
      }
      this.service.saveOrder(ReqObj).subscribe((response: any) => {
        console.log(response);
        return this.service.notify.showSuccess(response.message);
      })
    } else {
      const container = this.requestForm.getRawValue();
      console.log("this is a container1", container);
    
      for (const controlName in this.requestForm.controls) {
        if (this.requestForm.controls.hasOwnProperty(controlName)) {
          const control = this.requestForm.controls[controlName];
          if (control.invalid) {
            console.log(`Invalid control: ${controlName}`);
            // Access validation errors for the invalid control
            const errors = control.errors;
            console.log('Validation errors:', errors);
          }
        }
      }
      console.log("its not valide form",this.requestForm);
    }
  }
}
