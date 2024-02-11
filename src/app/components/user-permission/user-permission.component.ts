import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../header/menu/menu.component';
import { NavComponent } from '../header/nav/nav.component';
import { LoginService } from '../../service/login.service';
import { first } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDialogComponentComponent } from '../ConfirmationDialogComponent/confirmation-dialog-component/confirmation-dialog-component.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-permission',
  standalone: true,
  imports: [CommonModule, MenuComponent, NavComponent, MatTableModule],
  templateUrl: './user-permission.component.html',
  styleUrl: './user-permission.component.css'
})
export class UserPermissionComponent implements OnInit {
  dialogRef!: MatDialogRef<any>;
  constructor(public service: LoginService, readonly router: Router, private dialog: MatDialog) { }

  displayedColumns: string[] = ['index', 'roleName', 'roleDesc', 'action'];
  dataSource!: MatTableDataSource<any>;
  roleId: any;
  updateDeleteStatus = false;
  canUpdateRole = false;
  canDeleteRole = false;
  canInsertRole = false;
  isLoading = false;
  showErrorMessage = false;
  ngOnInit(): void {
    this.roleId = localStorage.getItem('RoleId');
    // if (this.roleId === '-1') {
    //   this.updateDeleteStatus = true;
    // }
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    this.service.getloggdUserPermission({ headers }).subscribe((response: any) => {
      let ManageUserPagePermission = response.data.detail.find((x: any) => x.ResourceId == 100);
      console.log("its DealerInventoryPagePermission", ManageUserPagePermission);

      if (ManageUserPagePermission && ManageUserPagePermission?.CanUpdate && ManageUserPagePermission?.CanUpdate == true) {
        this.canUpdateRole = true;
      }
      if (ManageUserPagePermission && ManageUserPagePermission?.CanDelete && ManageUserPagePermission?.CanDelete == true) {
        this.canDeleteRole = true;
      }
      if (ManageUserPagePermission && ManageUserPagePermission?.CanInsert && ManageUserPagePermission?.CanInsert == true) {
        this.canInsertRole = true;
      }
      this.isLoading = false;
    });
    this.rolePermission();
  }
  rolePermissionData: any = [];
  rolePermission() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    this.service.getAllRoles({ headers }).pipe(first()).subscribe((response: any) => {
      console.log("Get All Roles --", response.data.userDetail);
      this.rolePermissionData = response.data.userDetail;
      this.dataSource = new MatTableDataSource(this.rolePermissionData);
      this.isLoading = false;
      if(this.rolePermissionData.length === 0) {
        this.showErrorMessage = true;
      }
    });
  }

  addUserRole() {
    this.router.navigate(['/add_user_role']);
  }

  editRole(id: any) {
    this.router.navigate(['/add_user_role'], { queryParams: { roleId: id } });
  }

  deleteRole(item: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '400px',
      data: {
        header: "Confirmation",
        message: "Do you want to Delete ?"
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(item);
        this.isLoading = true;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        let data = {
          roleId: item.Id,
          isActive: 0
        }
        this.service.savePermission(data, { headers }).pipe(first()).subscribe((response: any) => {
          console.log("Delete Permissions --", response);
          this.isLoading = false;
          if(response.status === 200) {
            this.service.notify.showSuccess('User Deleted Successfully.')
          }
          if(response.status === 201) {
            this.service.notify.showSuccess(response.message);
          }
          this.rolePermission();
        }, (error) => {
          console.log(error);
          this.isLoading = false;
          if(error.error.status === 201) {
            this.service.notify.showSuccess(error.error.message);
          }
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
