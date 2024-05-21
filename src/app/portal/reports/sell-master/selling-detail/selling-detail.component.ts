import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { ProductionReportContainer } from 'src/app/library/core/models/report/prodcution/container';
import { SellService } from '../sell.service';
import { SellingContainer } from 'src/app/library/core/models/report/sellingReport/container';
@Component({
  selector: 'app-selling-detail',
  templateUrl: './selling-detail.component.html',
  styleUrls: ['./selling-detail.component.scss']
})
export class SellingDetailComponent implements OnInit {
  requestForm: FormGroup;
  addForm: FormGroup;
  requestId: number;
  OrderReportDetailLookups: any;
  constructor(readonly service: SellService,
    readonly route: ActivatedRoute,
    readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog, readonly authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.requestId = this.route.snapshot.params.id;
    this.bindDropdowns();
  }

  bindDropdowns() {
    const categories = [
      this.service.constants.MasterCategories.ClientMaster,
      this.service.constants.MasterCategories.WorkTypeMaster,
      this.service.constants.MasterCategories.ProductMaster,
      this.service.constants.MasterCategories.SizeMaster,
      this.service.constants.MasterCategories.DesignMaster,
      this.service.constants.MasterCategories.ColourMaster,
      this.service.constants.MasterCategories.HSN_Master,
      this.service.constants.MasterCategories.CustomerMaster


    ];
    this.service.getLookups(categories, (lookups: any) => {
      this.OrderReportDetailLookups = lookups;
      console.log("this is a Lokkups", lookups);
      this.initialize();
    });

  }
  obj: any
  initialize() {
    if (this.requestId) {
      console.log("its in request ID");
      let obj = {
        "SellingId": this.requestId
      }
      this.service.GetSellDetailById(obj).subscribe((response: any) => {
        console.log("This is Selling Obj",response);
        let customerData = response.data.listData[0];
        response.data.listData.shift();
        if (response.status === 200 && response.data) {
          let obj = {
             customerId : customerData.CustomerId,
             SellProductDetail : response.data.listData,
             isGst:customerData.isGst == false ? 1 : 0
          }
          console.log("this is obj",obj);
          
          const requestContainer = new SellingContainer(obj);
          this.requestForm = this.formBuilder.formGroup(requestContainer);
          console.log("this is a request",this.requestForm);
          
        }
      });
    } else {
      const requestContainer = new SellingContainer();
      this.requestForm = this.formBuilder.formGroup(requestContainer);
    }
  }
  saveNotes() {
    
  }
  onCancel() {
    this.router.navigate(['/SellingDetail'])
  }
  onSave() {
    if (this.requestForm.valid) {
      const container = this.requestForm.getRawValue();
      console.log(container);
      
      let obj = {
          CustomerId : container.customerId,
          IsGst :container.isGst,
        SellingTableType : container.SellProductDetail
      }
  console.log(obj);
      this.service.addSelling(obj).subscribe((response: any) => {
        console.log(response);
        return this.service.notify.showSuccess(response.message);
      })
    } else {
      console.log("its not valide form");
    }
  }
};