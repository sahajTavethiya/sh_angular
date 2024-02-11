import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  constructor(public service: LoginService, public router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  loggedUserName = localStorage.getItem('Name')?.toString();
  RoleId: any;
  token: any;
  AdminRole: any;
  ProfilePhoto: any;

  UrlForCarImage = environment.CDN_URL;
  thumb = environment.Thumb;
  other = environment.OtherPhotoVideo;
  FullUrlForUserImageShow: any;
  ngOnInit(): void {
    this.RoleId = localStorage.getItem('RoleId');
    this.token = localStorage.getItem('token');
    if (this.RoleId !== environment.adminRoleTypeId || this.RoleId !== environment.delerRoleTypeId) {
      this.showHideMenu();
    }
    if (this.RoleId == environment.adminRoleTypeId) {
      this.AdminRole = 'Super Admin';
    } else {
      this.rolePermission();
    }
    this.ProfilePhoto = localStorage.getItem('profilePhoto');
    if (this.ProfilePhoto !== null && this.ProfilePhoto !== 'undefined') {
      this.FullUrlForUserImageShow = this.UrlForCarImage + this.other + this.thumb + this.ProfilePhoto;
    } else {
      this.FullUrlForUserImageShow = 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg';
    }
  }
  canViewDashBord = false;
  canViewDealer = false;
  canViewCustomers = false;
  canViewSubscription = false;
  canViewPolicy = false;
  canViewMobileHomes = false;
  canViewUserManagement = false;
  canViewUserRole = false;
  canViewAdminInfoRole = false;
  canViewOCRRole = false;
  ocrTrueFalse = environment.isShowOCRModule;
  userPermissionData: any = [];

  rolePermissionData: any = [];
  rolePermission() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    this.service.getAllRoles({ headers }).pipe(first()).subscribe((response: any) => {
      console.log("Get All Roles --", response.data.userDetail);
      this.rolePermissionData = response.data.userDetail;

      let obj = this.rolePermissionData.find((x: any) => x.Id == this.RoleId);
      this.AdminRole = obj.RoleName;
    });
  }

  showHideMenu() {
    // if ((this.RoleId !== -1 || this.RoleId !== 10) && this.token) {
    const headers = new HttpHeaders().set('Authorization', `${this.token}`);
    this.service.getloggdUserPermission({ headers }).subscribe((response: any) => {
      console.log("this is a menu response", response.data.detail);
      response.data.detail.forEach((ele: any) => {
        if (ele.ResourceId == 10 && ele?.CanView && ele?.CanView == true) {
          this.canViewDashBord = true;
        };
        if (ele.ResourceId == 20 && ele?.CanView && ele?.CanView == true) {
          this.canViewDealer = true;
        };
        if (ele.ResourceId == 50 && ele?.CanView && ele?.CanView == true) {
          this.canViewCustomers = true;
        };
        if (ele.ResourceId == 60 && ele?.CanView && ele?.CanView == true) {
          this.canViewSubscription = true;
        };
        if (ele.ResourceId == 70 && ele?.CanView && ele?.CanView == true) {
          this.canViewPolicy = true;
        };
        if (ele.ResourceId == 80 && ele?.CanView && ele?.CanView == true) {
          this.canViewMobileHomes = true;
        };
        if (ele.ResourceId == 90 && ele?.CanView && ele?.CanView == true) {
          this.canViewUserManagement = true;
        };
        if (ele.ResourceId == 100 && ele?.CanView && ele?.CanView == true) {
          this.canViewUserRole = true;
        };
        if (ele.ResourceId == 120 && ele?.CanView && ele?.CanView == true) {
          this.canViewAdminInfoRole = true;
        };
        if(ele.ResourceId == 130 && ele?.CanView && ele?.CanView == true) {
          this.canViewOCRRole = true;
        }
      });
    });
    // }
  }

  isSidebarActive = false;
  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  logOut() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }
}
