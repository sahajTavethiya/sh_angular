import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { AddSubmitWorkDetailPopupComponent } from './add-submit-work-detail-popup/add-submit-work-detail-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { SubmitWorkService } from '../../submit-work.service';
import { DailyWorkBasicDetail } from 'src/app/library/core/models/report/dailyWork/daily-work-basic-detail.model';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ConfirmationDialogComponent } from 'src/app/library/shared/confirmation-dialog/confirmation-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-submit-work-basic-detail',
  templateUrl: './submit-work-basic-detail.component.html',
  styleUrls: ['./submit-work-basic-detail.component.scss']
})
export class SubmitWorkBasicDetailComponent implements OnInit {
  @Input() requestForm: FormGroup;
  @Input() AssignList: Array<any>;
  orderproductData:any;
  requestId:number;
  showAddButton=false;
  constructor(readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog, readonly service: SubmitWorkService,readonly route: ActivatedRoute,readonly authService: AuthService,) { }

  ngOnInit(): void {
    this.requestId = parseInt(this.route.snapshot.params.id);
    let obj = {
      OrderId:this.requestId
    }
    this.service.getJobWorkOrderDetailById(obj).subscribe((response: any) => {
      this.orderproductData = response.data.JobWorkProductData;
    })
    this.authService.GetRolePermissions().subscribe((response:any)=>{
      console.log("this is a response",response.data.result);

     this.showAddButton = response.data.result.find((obj: any) => obj.resourceId == environment.ResourceMasterIds.DailyWorkStatus)?.canInsert;
   })
  }
  addOpenSaveDailyWork(tblId:number) {
    const dialogRef = this.dialog.open(AddSubmitWorkDetailPopupComponent, {
      data: { AssignList: this.AssignList,tblId:tblId },
      width: '6000px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.addManpowerTaskTime(result);
      }
    });
  }
  addManpowerTaskTime(taskTime: DailyWorkBasicDetail) {
    const DailyWorkBasicDetails = this.requestForm.controls.DailyWorkBasicDetail as FormArray;

    console.log('taskTime11');
    console.log(taskTime);
    if (taskTime) {
      const newTaskTime = new DailyWorkBasicDetail(taskTime);

      const taskTimeForm = this.formBuilder.formGroup(newTaskTime);
      DailyWorkBasicDetails.push(taskTimeForm);
    }
  }
  deleteDailyWork(taskTypeId: any, index: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        header: "Delete",
        message: "Are you sure to delete!"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const assignedManpowerLists = this.requestForm.controls.DailyWorkBasicDetail as FormArray;
        console.log("asssd--", assignedManpowerLists);

        const row = assignedManpowerLists.at(index);
        if (row.get('tblId')?.value > 0) {
          row.get('isDelete')?.setValue(1);
          // assignedManpowerLists.removeAt(index);

          // row.get('rowStatus')?.setValue(4);
        } else {
          assignedManpowerLists.removeAt(index);
        }
      }
    });
  }
}
