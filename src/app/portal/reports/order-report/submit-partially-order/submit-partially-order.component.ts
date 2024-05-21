// //import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-submit-partially-order',
//   templateUrl: './submit-partially-order.component.html',
//   styleUrls: ['./submit-partially-order.component.scss'],
// })
// export class SubmitPartiallyOrderComponent implements OnInit {
//   constructor() {}

//   ngOnInit(): void {}
// }

import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ConfirmationDialogComponent } from 'src/app/library/shared/confirmation-dialog/confirmation-dialog.component';
import { ProductionBasicDetail } from 'src/app/library/core/models/report/prodcution/production-basic-report.model';
import { SubmitWorkService } from '../../submit-daily-work/submit-work.service';
import { SubmitPartiallyOrderPopUpComponent } from './submit-partially-order-pop-up/submit-partially-order-pop-up.component';
import { SubmitPartiallyOrderModel } from 'src/app/library/core/models/submit-partially-order.model';
@Component({
  selector: 'app-submit-partially-order',
  templateUrl: './submit-partially-order.component.html',
  styleUrls: ['./submit-partially-order.component.scss'],
})
export class SubmitPartiallyOrderComponent implements OnInit {
  @Input() requestForm: FormGroup;
  @Input() lookups: any;
  constructor(
    readonly formBuilder: RxFormBuilder,
    readonly dialog: MatDialog,
    readonly service: SubmitWorkService
  ) {}

  ngOnInit(): void {}
  addOpenSaveDailyWork() {
    const dialogRef = this.dialog.open(SubmitPartiallyOrderPopUpComponent, {
      data: { AssignList: this.lookups },
      width: '6000px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.addManpowerTaskTime(result);
      }
    });
  }
  addManpowerTaskTime(taskTime: SubmitPartiallyOrderModel) {
    const ProductionBasicDetail1 = this.requestForm.controls
      .SubmitPartiallyOrderModel as FormArray;
    if (taskTime) {
      taskTime.submitedOn = new Date();
      const newTaskTime = new SubmitPartiallyOrderModel(taskTime);

      const taskTimeForm = this.formBuilder.formGroup(newTaskTime);
      
      ProductionBasicDetail1.push(taskTimeForm);
    }
  }
  deleteDailyWork(taskTypeId: any, index: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        header: 'Delete',
        message: 'Are you sure to delete!',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const assignedManpowerLists = this.requestForm.controls
          .ProductionBasicDetail as FormArray;

        const row = assignedManpowerLists.at(index);
        if (row.get('tblId')?.value > 0) {
          row.get('isDelete')?.setValue(1);
        } else {
          assignedManpowerLists.removeAt(index);
        }
      }
    });
  }
}
