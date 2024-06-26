// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-submit-partially-order-pop-up',
//   templateUrl: './submit-partially-order-pop-up.component.html',
//   styleUrls: ['./submit-partially-order-pop-up.component.scss']
// })
// export class SubmitPartiallyOrderPopUpComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RxFormBuilder, json } from '@rxweb/reactive-form-validators';
import { ProductionBasicDetail } from 'src/app/library/core/models/report/prodcution/production-basic-report.model';
import { SubmitPartiallyOrderModel } from 'src/app/library/core/models/submit-partially-order.model';
import { AddSubmitWorkDetailPopupComponent } from 'src/app/portal/reports/submit-daily-work/submit-work-detail-page/submit-work-basic-detail/add-submit-work-detail-popup/add-submit-work-detail-popup.component';
import { SubmitWorkService } from 'src/app/portal/reports/submit-daily-work/submit-work.service';
import { TaskDetailsComponent } from 'src/app/portal/service-request/request/task-details/task-details.component';

@Component({
  selector: 'app-submit-partially-order-pop-up',
  templateUrl: './submit-partially-order-pop-up.component.html',
  styleUrls: ['./submit-partially-order-pop-up.component.scss'],
})
export class SubmitPartiallyOrderPopUpComponent implements OnInit {
  SaveWorkForm: FormGroup;
  lookups: any;

  constructor(
    readonly formBuilder: RxFormBuilder,
    public dialogRef: MatDialogRef<AddSubmitWorkDetailPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { AssignList: any },
    readonly service: SubmitWorkService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }
  ProductMaster: Array<any>;
  DesignMaster: Array<any>;
  SizeMaster: Array<any>;
  ColourMaster: Array<any>;
  IsCompletedArry = [{
    KeyName:0,
    DisplayText : 'Yes'
  },{
    KeyName : 1,
    DisplayText : 'No'
  }]
  initialize() {
    // this.EmployeeArr = this.data.AssignList.map(function(item) {
    //   return {
    //     AssignById: item.AssignEmployeeId,
    //     AssignEmployeeName: item.AssignEmployeeName
    //   };
    // });
    const  json = JSON.parse(localStorage.getItem('currentUser') || '{}'); 
    console.log('this is a lookups', this.lookups);
    this.ProductMaster =
      this.data.AssignList[
        this.service.constants.MasterCategories.ProductMaster
      ];
    this.DesignMaster =
      this.data.AssignList[
        this.service.constants.MasterCategories.DesignMaster
      ];
    this.SizeMaster =
      this.data.AssignList[this.service.constants.MasterCategories.SizeMaster];
    this.ColourMaster =
      this.data.AssignList[
        this.service.constants.MasterCategories.ColourMaster
      ];

    const manpowerTaskTimeList = new SubmitPartiallyOrderModel();
    this.SaveWorkForm = this.formBuilder.formGroup(manpowerTaskTimeList);

    manpowerTaskTimeList.createdBy = json.id;
// this.SaveWorkForm.get()
  }
  cancel() {
    this.dialogRef.close();
  }
  saveData() {
    if (this.SaveWorkForm.valid) {
      const taskType = this.SaveWorkForm.getRawValue();

      console.log("taskType",taskType);
   
      // let obj = this.data.AssignList.find(x => x.AssignEmployeeId == taskType.userId);
      // const currentDate = new Date();
      // const formattedDate = currentDate.toISOString();
      // console.log('this is a ProdcutId', taskType.productId);

      // let productObj = this.ProductMaster.find(
      //   (x) => x.KeyName == taskType.productId 
      // );
      // console.log(productObj);
      // taskType.productName = productObj.DisplayText;

      // let DesignObj = this.DesignMaster.find(
      //   (x) => x.KeyName == taskType.designId
      // );
      // taskType.designName = DesignObj.DisplayText;

      // let SizeObj = this.SizeMaster.find((x) => x.KeyName == taskType.sizeId);
      // taskType.sizeName = SizeObj.DisplayText;

      // let ColourObj = this.ColourMaster.find(
      //   (x) => x.KeyName == taskType.colourId
      // );
      // taskType.colourName = ColourObj.DisplayText;
      // console.log('this is a taskType', taskType);
      // if(taskType.employeeId){
      //   taskType.completedByEmployee = true;
      // }else{
      //   taskType.completedByEmployee=false;
      // }
      // taskType.assignTaskMasterId = obj.AssignTaskMasterId;
      // taskType.completedByEmployee = true;
      // taskType.workRatePerPiece = obj.WorkRatePerPiece,
      (taskType.isDelete = 0), (taskType.tblId = 0);
      this.dialogRef.close(taskType);
    } else {
      this.SaveWorkForm.markAllAsTouched();
      this.service.notify.showDefaultError();
    }
  }
}
