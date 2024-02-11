import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { LoginService } from '../../service/login.service';
import { MenuComponent } from '../header/menu/menu.component';
import { NavComponent } from '../header/nav/nav.component';
import { environment } from '../../environment/environment';
import { ConfirmationDialogComponentComponent } from '../ConfirmationDialogComponent/confirmation-dialog-component/confirmation-dialog-component.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, MenuComponent, NavComponent, MatTableModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  dialogRef!: MatDialogRef<any>;

  constructor(public service: LoginService, readonly router: Router, private dialog: MatDialog) { }

  displayedColumns: string[] = ['name', 'roleName', 'phone', 'email', 'userStatus', 'startDate', 'action'];
  dataSource!: MatTableDataSource<any>;

  UrlForCarImage = environment.CDN_URL;
  thumb = environment.Thumb;
  other = environment.OtherPhotoVideo;
  FullUrlForUserImageShow: any;
  isLoading = false;
  ngOnInit(): void {
    this.FullUrlForUserImageShow = this.UrlForCarImage + this.other + this.thumb;
    this.rolePermission();
    this.getUserList();
  }
  rolePermissionData: any = [];
  roleId: any;
  updateDeleteStatus = false;
  canDeleteUser = false;
  canUpdateUser = false;
  canInsertUser = false;
  showErrorMessage = false;
  rolePermission() {
    this.isLoading = true;
    this.roleId = localStorage.getItem('RoleId');
    // if (this.roleId === '-1') {
    //   this.updateDeleteStatus = true;
    // }
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    // Role Type Id - Deler - 10 , Customer - 20, Admin - -1.
    this.service.getloggdUserPermission({ headers }).subscribe((response: any) => {
      let ManageUserPagePermission = response.data.detail.find((x: any) => x.ResourceId == 90);
      console.log("its DealerInventoryPagePermission", ManageUserPagePermission);

      if (ManageUserPagePermission && ManageUserPagePermission?.CanUpdate && ManageUserPagePermission?.CanUpdate == true) {
        this.canUpdateUser = true;
      }
      if (ManageUserPagePermission && ManageUserPagePermission?.CanDelete && ManageUserPagePermission?.CanDelete == true) {
        this.canDeleteUser = true;
      }
      if (ManageUserPagePermission && ManageUserPagePermission?.CanInsert && ManageUserPagePermission?.CanInsert == true) {
        this.canInsertUser = true;
      }
      this.isLoading = false;
    });
  }

  getUserList() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    let data = {
      skip: 0,
      take: 10
    }
    this.isLoading = true;
    this.service.getAdminUserList(data, { headers }).pipe(first()).subscribe((response: any) => {
      console.log("Get All Roles --", response.data.dataArray);
      this.rolePermissionData = []; //response.data.dataArray;
      this.isLoading = false;
      if (response.data.dataArray === null || response.data.dataArray === undefined) {
        this.showErrorMessage = true;
        this.dataSource = new MatTableDataSource(this.rolePermissionData);
      } else {
        response.data.dataArray.forEach((element: any) => {
          if (element?.ProfilePhoto && (element?.ProfilePhoto !== undefined || element?.ProfilePhoto !== null)) {
            element.url = this.FullUrlForUserImageShow + element.ProfilePhoto;
            console.log("User Image Response --", element);
            this.rolePermissionData.push(element);
          } else {
            element.url = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
            console.log("Not Image for this User", element);
            this.rolePermissionData.push(element);
          }
          this.dataSource = new MatTableDataSource(this.rolePermissionData);

        });
      }
    });
  }

  addUserRole() {
    this.router.navigate(['/add_user_management']);
  }

  editUser(id: any) {
    let dealerId = parseInt(id);
    this.router.navigate(['/add_user_management'], { queryParams: { dealerId: dealerId } })
  }

  deleteUser(item: any) {

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
        let data = {
          mobileNo: item.PhoneNumber || null,
          emailId: item.EmailId || null,
          name: item.RoleName || null,
          password: '',
          profilePhoto: item.ProfilePhoto || null,
          roleType: item.RoleId || null,
          userId: parseInt(item.Id) || 0,
          isDeleted: 1
        }
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        this.service.addAdminUser(data, { headers }).pipe(first()).subscribe((response: any) => {
          console.log("Delete User --", response);
          if(response.status === 200) {
            this.service.notify.showSuccess(response.message);
          }
          this.isLoading = false;
          this.rolePermissionData = [];
          this.getUserList();
        }, (error) => {
          console.log(error);
          this.isLoading = false;
        });
      }
    });

  }

  dateConvert(date: any) {
    if (date !== undefined || date !== null) {
      const dateTime = new Date(date);
      const formattedDate = dateTime.toLocaleDateString('en-GB');
      return formattedDate;
    } else {
      return date;
    }
  }
}
