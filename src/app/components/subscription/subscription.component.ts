import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';
import { LoginService } from '../../service/login.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../header/menu/menu.component';
import { NavComponent } from '../header/nav/nav.component';
import { ConfirmationDialogComponentComponent } from '../ConfirmationDialogComponent/confirmation-dialog-component/confirmation-dialog-component.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule, MenuComponent, NavComponent],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent implements OnInit {
  dialogRef!: MatDialogRef<any>;
  constructor(public router: Router, public service: LoginService, private dialog: MatDialog) { }
  isSidebarActive = false;
  days: boolean = false;
  unlimt: boolean = false;
  loggedUserName = localStorage.getItem('Name')?.toString();
  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
  subscriptionGetAllPlan: any = [];
  // retrievedData : any;
  canUpdateScription = false;
  canDeleteScription = false;
  canInsertScription = false;
  isLoading = false;
  ngOnInit(): void {
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    // Role Type Id - Deler - 10 , Customer - 20, Admin - -1.
    this.isLoading = true;
    this.service.getloggdUserPermission({ headers }).subscribe((response: any) => {
      let SubscriptionPagePermission = response.data.detail.find((x: any) => x.ResourceId == 60);
      console.log("its DealerInventoryPagePermission", SubscriptionPagePermission);

      if (SubscriptionPagePermission && SubscriptionPagePermission?.CanUpdate && SubscriptionPagePermission?.CanUpdate == true) {
        this.canUpdateScription = true;
      }
      if (SubscriptionPagePermission && SubscriptionPagePermission?.CanDelete && SubscriptionPagePermission?.CanDelete == true) {
        this.canDeleteScription = true;
      }
      if (SubscriptionPagePermission && SubscriptionPagePermission?.CanInsert && SubscriptionPagePermission?.CanInsert == true) {
        this.canInsertScription = true;
      }
      this.isLoading = false;
    })
    let data = {
      subscriptionId: null,
      // carlist: this.subscriptionGetAllPlan.NoOfCarAddLimit,
    }

    console.log("zxcvbnm", data);
    this.isLoading = true;
    this.service.getAllSubScriptionPlan(data, { headers }).pipe(first()).subscribe((data: any) => {

      console.log(data.data.planMaster);
      this.subscriptionGetAllPlan = data.data.planMaster;

      let names = this.subscriptionGetAllPlan.map((item: any) => item.NoOfCarAddLimit);
      console.log("asdfghjkl", names);
      if (names === 0) {
        this.days = false;
      } else {
        this.days = true;
      }
      this.isLoading = false;
    });
  }

  addPlan() {
    this.router.navigate(['/add_plan']);
  }

  dashboard() {
    this.router.navigate(['/dashboard']);
  }

  delers() {
    this.router.navigate(['/deler']);
  }

  customerDetail() {
    this.router.navigate(['/customer_detail']);
  }

  plan() {
    this.router.navigate(['/subscription']);
  }

  privacy() {
    this.router.navigate(['/privacy_policy']);
  }

  ads() {
    this.router.navigate(['/addAds']);
  }

  logOut(): void {
    this.router.navigate(['/login']);
    localStorage.clear();
  }

  editSubscription(Id: any) {
    let obj = this.subscriptionGetAllPlan.find((x: any) => x.Id == Id)
    this.service.sendDataToAddSubscriptionComp(obj);
    this.router.navigate([`/edit_plan/${Id}`])
  }
  deleteSubscription(Id: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '400px',
      data: {
        header: "Confirmation",
        message: "Do you want to Delete ?"
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.isLoading = true;
        let obj = this.subscriptionGetAllPlan.find((x: any) => x.Id == Id)
        const token = localStorage.getItem('token');
        let data = {
          id: obj.Id,
          subscriptionName: obj.SubscriptionName,
          subscriptionDescription: obj.SubscriptionDescription,
          amount: obj.Amount,
          subscribDays: obj.SubscribDays,
          isDeleted: 1
        }
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        this.service.addNewSubscriptionPlan(data, { headers }).pipe(first()).subscribe((response: any) => {
          this.isLoading = false;
          if (response.status === 200) {
            this.service.notify.showSuccess(response.data.msg);
          }
          this.ngOnInit();
        }, (error) => {
          console.log("API Error -", error);
          if (error.error.status === 500) {
            this.isLoading = false;
            this.service.notify.showSuccess(error.error.data);
          }

        })
      }
    });
  }
}
