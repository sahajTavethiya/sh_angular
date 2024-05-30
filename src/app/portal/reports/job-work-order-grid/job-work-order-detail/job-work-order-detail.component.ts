import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { AddOrderBasicDetail } from 'src/app/library/core/models/add-order-basic-detail.model';
import { environment } from 'src/environments/environment';
import { OrderReportServiceService } from '../../order-report/order-report-service.service';
import { JobWorkOrderModel } from 'src/app/library/core/models/report/jobWorkOrder/order-basic-detail.model';
@Component({
  selector: 'app-job-work-order-detail',
  templateUrl: './job-work-order-detail.component.html',
  styleUrls: ['./job-work-order-detail.component.scss'],
})
export class JobWorkOrderDetailComponent implements OnInit {
  requestForm: FormGroup;
  addForm: FormGroup;
  requestId: number;
  IsAddOrderForm = false;
  OrderReportDetailLookups: any;
  constructor(
    readonly service: OrderReportServiceService,
    readonly route: ActivatedRoute,
    readonly formBuilder: RxFormBuilder,
    readonly dialog: MatDialog,
    readonly authService: AuthService,
    private router: Router
  ) {}

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
      this.service.constants.OrderReportCategories.VendorMaster,
      this.service.constants.MasterCategories.ColourMaster,
    ];
    this.service.getLookups(categories, (lookups: any) => {
      this.OrderReportDetailLookups = lookups;
    });
    this.initialize();
  }
  obj: any;
  currentPath: any;
  initialize() {
    this.currentPath = this.route.snapshot.url.join('/');
    console.log("this.currentPath",this.currentPath)
    if (this.currentPath === 'JobWorkOrderReportDetail') {
      this.IsAddOrderForm = true;
    }
    console.log(this.IsAddOrderForm);
    if (this.requestId) {
      let obj = {
        OrderId: this.requestId,
      };
      this.service.getJobWorkOrderDetailById(obj).subscribe((response: any) => {
        if (response.status === 200 && response.data) {
          let obj = {
            WorkTypeId: 1,
            // DesignId : response.data.resData1[0].DesignId || null,
            ClientId: response.data.BasicDetail.ClientId || null,
            // ProductId : response.data.resData1[0].ProductId || null,
            // SizeId : response.data.resData1[0].SizeId || null,
            BillNo: response.data.BasicDetail.BillNo || null,
            // TotalItem : response.data.resData1[0].TotalItem || null,
            // AmountPerOneItem : response.data.resData1[0].AmountPerOneItem || null,
            HSN_Code: response.data.BasicDetail.HSN_CodeId || null,
            // Qty : response.data.resData1[0].Qty,
            // UOM : response.data.resData1[0].UOM || null,
            StatusId: response.data.BasicDetail.StatusId,
            isGst: response.data.BasicDetail.IsGST || 0,
            SubmitPartiallyOrderModel:
              response.data.SubmitedOrderData.length == 0 ? null : response.data.SubmitedOrderData,
              // want to change as response
            JobWorkProductDetail: response.data.JobWorkProductData,
          };
          // if (obj.WorkTypeId == environment.ManufactureWorkTypeId) {
          //   this.IsAddOrderForm = true;
          // }
          // response.data.resData1.shift();
          // this.obj.SubmitPartiallyOrderModel = response.data.resData1;
          const requestContainer = new JobWorkOrderModel(obj);
          this.requestForm = this.formBuilder.formGroup(requestContainer);
        }
      });
    } else {
      const requestContainer = new JobWorkOrderModel();
      this.requestForm = this.formBuilder.formGroup(requestContainer);
    }
  }
  saveNotes() {}
  onCancel() {
    this.router.navigate(['/OrderReport']);
  }
  onSave() {
    if (this.requestForm.valid) {
      const container = this.requestForm.getRawValue();
      console.log('this is a container', container);
      let ReqObj = {
        OrderId: this.requestId,
        WorkTypeId: 1,
        ClientId: container.ClientId,
        // DesignId:container.DesignId,
        // TotalItem:container.TotalItem,
        // AmountPerOneItem:container.AmountPerOneItem,
        // ProductId:container.ProductId,
        HSN_CodeId: container.HSN_Code,
        BillNo: container.BillNo,
        ImageName: container.ImageName,
        // SizeId:container.SizeId,
        StatusId: container.StatusId,
        // Qty:container.Qty,
        // UOM:container.UOM,
        // Vendor:container.Vendor,
        IsGst: container.isGst,
        SubmitPartiallyOrderModel: container.SubmitPartiallyOrderModel,
        JobWorkOrderTableType: container.JobWorkProductDetail,
      };
      console.log(ReqObj);
      this.service.addJobWorkOrder(ReqObj).subscribe((response: any) => {
        console.log(response);
        if (response.message == 'ORDER_ADDED_SUCCESSFULLY') {
          // this.router.navigate(['/OrderReport'])
          return this.service.notify.showSuccess(response.message);
        }
        this.router.navigate(['/OrderReport']);
      });
    } else {
      const container = this.requestForm.getRawValue();
      console.log('this is a container1', container);

      for (const controlName in this.requestForm.controls) {
        if (this.requestForm.controls.hasOwnProperty(controlName)) {
          const control = this.requestForm.controls[controlName];
          if (control.invalid) {
            console.log(`Invalid control: ${controlName}`);
            // Access validation errors for the invalid control
            const errors = control.errors;
            8;
            console.log('Validation errors:', errors);
          }
        }
      }
      console.log('its not valide form', this.requestForm);
    }
  }
}
