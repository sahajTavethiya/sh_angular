import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuComponent } from '../../header/menu/menu.component';
import { NavComponent } from '../../header/nav/nav.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../service/login.service';
import { HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs';

@Component({
  selector: 'app-add-user-role',
  standalone: true,
  imports: [CommonModule, MenuComponent, NavComponent, FormsModule, ReactiveFormsModule, MatTableModule, MatInputModule, MultiSelectModule, DropdownModule],
  templateUrl: './add-user-role.component.html',
  styleUrl: './add-user-role.component.css'
})
export class AddUserRoleComponent implements OnInit {
  rolePermissionForm: FormGroup;

  constructor(public service: LoginService, readonly router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.rolePermissionForm = this.formBuilder.group({
      roleName: ['', Validators.required],
      roleDescription: ['', Validators.required],
      roleId: [''],
      resourceId: [''],
      canView: [''],
      canInsert: [''],
      canUpdate: [''],
      canDelete: [''],
    });
  }
  ReadOnlyDescription = false;
  roleId: any;
  isLoading = false;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.roleId = params['roleId'];
    });
    console.log("this is a roleId", this.roleId);

    if (this.roleId) {
      this.ReadOnlyDescription = true;
      this.getRolePermissionByRole();
    } else {
      this.getAllPermission();

    }
  }

  displayedColumns: any = [];
  dataSource!: MatTableDataSource<any>;

  rolePermissionById: any = [];
  roleDetailById: any = [];
  mergedArray: any = [];
  getRolePermissionByRole() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    let data = {
      roleId: parseInt(this.roleId)
    }
    this.service.getRolePermissionByRole(data, { headers }).pipe(first()).subscribe((response: any) => {
      console.log("Get Role Permission By Id --", response.data);
      console.log("this is for get fdata from api", this.rolePermissionById);
      this.roleDetailById = {
        roleName: response.data.detail[0]?.RoleName,
        roleDescription: response.data.detail[0]?.RoleDescription,
        roleId: response.data.detail[0]?.RoleId,
      }
      this.rolePermissionForm.patchValue(this.roleDetailById);
      this.rolePermissionById = response.data.detail.map((item: any) => {
        const { CanView, CanUpdate, CanInsert, CanDelete, ResourceId, ...rest } = item;
        this.isLoading = false;
        return {
          canView: CanView,
          canInsert: CanInsert,
          canUpdate: CanUpdate,
          canDelete: CanDelete,
          resourceId: ResourceId,
          ...rest
        };
      });

      this.isLoading = true;
      console.log("its child123", this.rolePermissionById);
      this.service.getAllPermissions({ headers }).pipe(first()).subscribe((response: any) => {
        console.log("Get All Permissions --", response.data.userDetail);
        console.log("its child", this.rolePermissionById);

        response.data.userDetail.forEach((objB: any) => {

          const matchingObjA = this.rolePermissionById.find((objA: any) => objA.resourceId == objB.Id);
          if (!matchingObjA) {
            console.log("its not Mathc", objB);

            let obj = {
              canView: false,
              canAdd: false,
              canUpdate: false,
              canDelete: false,
              resourceId: objB.Id,
              ResourceName: objB.ResourceName
            }
            this.rolePermissionById.push(obj);
          }
        });
        this.isLoading = false;
      });
    });
  }

  allPermissions: any = [];
  getAllPermission() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    this.service.getAllPermissions({ headers }).pipe(first()).subscribe((response: any) => {
      console.log("Get All Permissions --", response.data.userDetail);
      this.rolePermissionById = response.data.userDetail;
      this.rolePermissionById = this.rolePermissionById.map((item: any) => {
        const { Opt_Add, Opt_Delete, Opt_Edit, Opt_View, ...rest } = item;
        return {
          canView: false,
          canInsert: false,
          canUpdate: false,
          canDelete: false,
          ...rest
        };
      });

      console.log("Role Permission By Id --", this.rolePermissionById);
      
      this.displayedColumns = this.allPermissions;
      console.log(this.displayedColumns);
      this.isLoading = false;
    });
  }

  resourceStatus: any = [];

  checkBoxChange(event: any, header: any, accessId: any,) {
    let checkBoxStatus = event.target.checked;
    let obj = {
      resourceId: header.resourceId || header.Id,
      canView: false,
      canInsert: false,
      canUpdate: false,
      canDelete: false
    };
    if (accessId === 1) {
      let findInArray = this.resourceStatus.find((x: any) => x.resourceId === obj.resourceId);
      if ((this.roleId == null || this.roleId == undefined) && findInArray === undefined) {
        obj.canView = true;
        this.resourceStatus.push(obj);
      }
      if (findInArray !== null && this.roleId == null) {
        const index = this.resourceStatus.findIndex((x: any) => x.resourceId === obj.resourceId);
        if (index !== -1) {
          if (checkBoxStatus == true) {
            this.resourceStatus[index] = {
              ...this.resourceStatus[index],
              canView: true,
            };
          } else {
            this.resourceStatus[index] = {
              ...this.resourceStatus[index],
              canView: false,
            };
          }
        }
      } else {

        if (parseInt(this.roleId) != null) {
          const index = this.rolePermissionById.findIndex((x: any) => x.resourceId === obj.resourceId);
          if (index !== -1) {
            if (checkBoxStatus == true) {
              this.rolePermissionById[index] = {
                ...this.rolePermissionById[index],
                canView: true,
              };
            } else {
              this.rolePermissionById[index] = {
                ...this.rolePermissionById[index],
                canView: false,
              };
            }
          }
        }

      }
    } if (accessId === 2) {
      let findInArray = this.resourceStatus.find((x: any) => x.resourceId === obj.resourceId);
      if ((this.roleId == null || this.roleId == undefined) && findInArray === undefined) {
        obj.canInsert = true;
        this.resourceStatus.push(obj);
      }
      if (findInArray !== null && this.roleId == null) {
        const index = this.resourceStatus.findIndex((x: any) => x.resourceId === obj.resourceId);
        if (index !== -1) {
          if (checkBoxStatus == true) {
            this.resourceStatus[index] = {
              ...this.resourceStatus[index],
              canInsert: true,
            };
          } else {
            this.resourceStatus[index] = {
              ...this.resourceStatus[index],
              canInsert: false,
            };
          }
        }
      } else {

        if (parseInt(this.roleId) != null) {
          const index = this.rolePermissionById.findIndex((x: any) => x.resourceId === obj.resourceId);
          if (index !== -1) {
            if (checkBoxStatus == true) {
              this.rolePermissionById[index] = {
                ...this.rolePermissionById[index],
                canInsert: true,
              };
            } else {
              this.rolePermissionById[index] = {
                ...this.rolePermissionById[index],
                canInsert: false,
              };
            }
          }
        }

      }
      // let findInArray = this.resourceStatus.find((x: any) => x.resourceId === obj.resourceId);
      // if (findInArray === undefined) {
      //   obj.canInsert = true;
      //   this.resourceStatus.push(obj);
      // } else {
      //   const index = this.resourceStatus.findIndex((x: any) => x.resourceId === obj.resourceId);
      //   if (index !== -1) {
      //     if (checkBoxStatus == true) {
      //       this.resourceStatus[index] = {
      //         ...this.resourceStatus[index],
      //         canInsert: true,
      //       };
      //     } else {
      //       this.resourceStatus[index] = {
      //         ...this.resourceStatus[index],
      //         canInsert: false,
      //       };
      //     }
      //   }
      // }
    } if (accessId === 3) {
      let findInArray = this.resourceStatus.find((x: any) => x.resourceId === obj.resourceId);
      if ((this.roleId == null || this.roleId == undefined) && findInArray === undefined) {
        obj.canUpdate = true;
        this.resourceStatus.push(obj);
      }
      if (findInArray !== null && this.roleId == null) {
        const index = this.resourceStatus.findIndex((x: any) => x.resourceId === obj.resourceId);
        if (index !== -1) {
          if (checkBoxStatus == true) {
            this.resourceStatus[index] = {
              ...this.resourceStatus[index],
              canUpdate: true,
            };
          } else {
            this.resourceStatus[index] = {
              ...this.resourceStatus[index],
              canUpdate: false,
            };
          }
        }
      } else {

        if (parseInt(this.roleId) != null) {
          const index = this.rolePermissionById.findIndex((x: any) => x.resourceId === obj.resourceId);
          if (index !== -1) {
            if (checkBoxStatus == true) {
              this.rolePermissionById[index] = {
                ...this.rolePermissionById[index],
                canUpdate: true,
              };
            } else {
              this.rolePermissionById[index] = {
                ...this.rolePermissionById[index],
                canUpdate: false,
              };
            }
          }
        }

      }
      // let findInArray = this.resourceStatus.find((x: any) => x.resourceId === obj.resourceId);
      // if (findInArray === undefined) {
      //   obj.canUpdate = true;
      //   this.resourceStatus.push(obj);
      // } else {
      //   const index = this.resourceStatus.findIndex((x: any) => x.resourceId === obj.resourceId);
      //   if (index !== -1) {
      //     if (checkBoxStatus == true) {
      //       this.resourceStatus[index] = {
      //         ...this.resourceStatus[index],
      //         canUpdate: true,
      //       };
      //     } else {
      //       this.resourceStatus[index] = {
      //         ...this.resourceStatus[index],
      //         canUpdate: false,
      //       };
      //     }
      //   }
      // }
    } if (accessId === 4) {
      let findInArray = this.resourceStatus.find((x: any) => x.resourceId === obj.resourceId);
      if ((this.roleId == null || this.roleId == undefined) && findInArray === undefined) {
        obj.canDelete = true;
        this.resourceStatus.push(obj);
      }
      if (findInArray !== null && this.roleId == null) {
        const index = this.resourceStatus.findIndex((x: any) => x.resourceId === obj.resourceId);
        if (index !== -1) {
          if (checkBoxStatus == true) {
            this.resourceStatus[index] = {
              ...this.resourceStatus[index],
              canDelete: true,
            };
          } else {
            this.resourceStatus[index] = {
              ...this.resourceStatus[index],
              canDelete: false,
            };
          }
        }
      } else {

        if (parseInt(this.roleId) != null) {
          const index = this.rolePermissionById.findIndex((x: any) => x.resourceId === obj.resourceId);
          if (index !== -1) {
            if (checkBoxStatus == true) {
              this.rolePermissionById[index] = {
                ...this.rolePermissionById[index],
                canDelete: true,
              };
            } else {
              this.rolePermissionById[index] = {
                ...this.rolePermissionById[index],
                canDelete: false,
              };
            }
          }
        }

      }
    }
    //   let findInArray = this.resourceStatus.find((x: any) => x.resourceId === obj.resourceId);
    //   if (findInArray === undefined) {
    //     obj.canDelete = true;
    //     this.resourceStatus.push(obj);
    //   } else {
    //     const index = this.resourceStatus.findIndex((x: any) => x.resourceId === obj.resourceId);
    //     if (index !== -1) {
    //       if (checkBoxStatus == true) {
    //         this.resourceStatus[index] = {
    //           ...this.resourceStatus[index],
    //           canDelete: true,
    //         };
    //       } else {
    //         this.resourceStatus[index] = {
    //           ...this.resourceStatus[index],
    //           canDelete: false,
    //         };
    //       }
    //     }
    //   }
    console.log(this.rolePermissionById);
  }

  onSubmit() {
    console.log("its mergedArray on submit", this.rolePermissionById);
    if (this.rolePermissionForm.valid) {
      this.isLoading = true;
      console.log(this.rolePermissionForm.value);
      let data = {
        roleId: 0,
        roleName: this.rolePermissionForm.value.roleName,
        roleDescription: this.rolePermissionForm.value.roleDescription,
        rolePermissionData: this.resourceStatus.length == 0 ? this.rolePermissionById : this.resourceStatus
      }

      if (this.roleId !== null && this.roleId !== '' && this.roleId !== undefined) {
        data.roleId = parseInt(this.roleId);
      }
      console.log(data);

      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      this.service.savePermission(data, { headers }).pipe(first()).subscribe((response: any) => {
        console.log("Save Permissions --", response);
        if(response.status === 200) {
          this.service.notify.showSuccess(response.message)
        }
        this.isLoading = false;
        this.rolePermissionForm.reset();
        this.router.navigate(['/user_permission']);
      });
    } else {
      if (this.rolePermissionForm.value.roleName === null || this.rolePermissionForm.value.roleName === '') {
        this.service.notify.showSuccess("Role Name is a Required Property!!!");
      }
      else if (this.rolePermissionForm.value.roleDescription === null || this.rolePermissionForm.value.roleDescription === '') {
        this.service.notify.showSuccess("Role Description is a Required Property!!!");
      }
      console.log("Form is not Valid!!!");
    }
  }

  back() {
    this.router.navigate(['/user_permission']);
  }

}
