import { Component, OnInit } from '@angular/core';
import { UserRoleMasterModel } from 'src/app/library/core/models/user-role-master/user-role-master.model';
import { ConfirmationDialogComponent } from 'src/app/library/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment.prod';
import { UserMasterRoleService } from '../user-master-role.service';

@Component({
  selector: 'app-user-master-role-add',
  templateUrl: './user-master-role-add.component.html',
  styleUrls: ['./user-master-role-add.component.scss']
})
export class UserMasterRoleAddComponent implements OnInit {

  constructor(readonly router: Router, private routeUrl: Router, readonly dialog: MatDialog, readonly service: UserMasterRoleService, readonly formBuilder: RxFormBuilder, readonly route: ActivatedRoute) { }

  rolePermissionById: any = [];
  requestForm: FormGroup;
  rolePermissionForm: any;
  roleId: any;
  isLoading: any;
  StatusArr = [
    { KeyName: 1, DisplayText: "Active" },
    { KeyName: 0, DisplayText: "InActive" }
  ];
  wantToShow: any;
  saveButton = true;
  userMasterDelete = true;
  RoleId: any;
  addHeader = true;
  editHeader = false;

  ngOnInit(): void {

    this.RoleId = this.route.snapshot.params.id;

    this.service.GetRolePermissions().subscribe((response: any) => {
      console.log("this is a kalu", response);
      if (this.RoleId != null) {
        let obj = response.data.table.find((obj: any) => obj.resourceId == environment.ResourceMasterIds.RoleMaster);
        if (obj.canUpdate == false) {
          this.saveButton = false;
        }
        console.log("szdcvgfdbfbzdfbzdfnzdn", obj);

      }
      if (this.RoleId != null) {
        let obj = response.data.table.find((obj: any) => obj.resourceId == environment.ResourceMasterIds.RoleMaster);
        if (obj.canDelete == false) {
          this.userMasterDelete = false;
        }
        console.log("fhsidufhbuasdfus", obj);

      }
    });
    let intReqId = parseInt(this.RoleId);
    console.log(this.RoleId);
    if (this.RoleId != null) {
      this.getPermisionByRole();
    }
    else {
      this.bindDropdowns();
      const requestContainer = new UserRoleMasterModel();
      this.requestForm = this.formBuilder.formGroup(requestContainer);
    }
  }

  AllRole: any;
  bindDropdowns() {
    const categories = [
      this.service.constants.MasterCategories.MasterResource
    ];
    this.service.getLookups(categories, (async (lookups: any) => {
      console.log(JSON.stringify(lookups));
      if (lookups) {
        this.AllRole = lookups[this.service.constants.MasterCategories.MasterResource];
        this.rolePermissionById = this.AllRole.map((resource: any) => ({
          ...resource,
          canView: false,
          canInsert: false,
          canUpdate: false,
          canDelete: false,
          canApprove: false,
          fullAccess: false,
          resourceId: parseInt(resource.keyName)
        }
        ));
      }
    }
    ));

    console.log("this is a rolePewef;askdf;skdfh;lksjdf", this.rolePermissionById);
  }
  modelObj: any;
  getPermisionByRole() {

    const categories = [
      this.service.constants.MasterCategories.MasterResource
    ];
    this.service.getLookups(categories, (async (lookups: any) => {
      console.log(JSON.stringify(lookups));
      if (lookups) {
        this.AllRole = lookups[this.service.constants.MasterCategories.MasterResource];

      }
    }
    ));

    let RoleId;
    RoleId = this.route.snapshot.params.id;
    let intReqId = parseInt(RoleId);
    console.log(RoleId);
    if (RoleId != null) {
      this.service.GetRoleDetailById(intReqId).subscribe(async (response: any) => {
        console.log("this ia s response --", response);

        if (this.RoleId !== null) {
          this.addHeader = false;
          this.editHeader = true;
        }

        //  this.rolePermissionById = response.data.table;
        this.rolePermissionById = await response.data.table.map((item: any) => {
          const { CanView, CanUpdate, CanInsert, CanDelete, canApprove, ResourceId, resourceName, ...rest } = item;
          this.isLoading = false;
          console.log(`CanView-${item.canView},CanInsert-${item.canInsert},CanUpdate-${item.canUpdate},CanDelete-${item.canDelete}`);

          const fullAccess = item.canView && item.canInsert && item.canUpdate && item.canDelete;
          console.log("this is a full access", fullAccess);

          return {
            canView: CanView,
            canInsert: CanInsert,
            canUpdate: CanUpdate,
            canDelete: CanDelete,
            canApprove: canApprove,
            resourceId: ResourceId,
            fullAccess: fullAccess == true ? true : false,
            displayText: resourceName,
            ...rest
          };
        });
        setTimeout(() => {
          this.setdataInArray();
        }, 200);

        this.modelObj = {
          roleName: response.data.table[0].roleName,
          roleDescription: response.data.table[0].roleDescription,
          status: 1, // response.data.table[0].status  , 
          roleId: response.data.table[0].roleId,
        };

        //  })
      });
    }
  }

  setdataInArray() {
    const categories = [
      this.service.constants.MasterCategories.MasterResource
    ];
    this.service.getLookups(categories, (async (lookups: any) => {
      console.log(JSON.stringify(lookups));
      if (lookups && this.rolePermissionById.length > 46) {
        this.AllRole = lookups[this.service.constants.MasterCategories.MasterResource];
        this.AllRole.forEach(async (objB: any) => {
          const matchingObjA = await this.rolePermissionById.find((objA: any) => objA.resourceId == objB.keyName);
          console.log("its Match", matchingObjA);
          if (!matchingObjA) {
            console.log("its not Mathc", objB);
            let obj = {
              canView: false,
              canInsert: false,
              canUpdate: false,
              canDelete: false,
              canApprove: false,
              resourceId: parseInt(objB.keyName),
              fullAccess: false,
              displayText: objB.displayText,
              ResourceName: objB.ResourceName
            };
            this.rolePermissionById.push(obj);
          }
        });
      } else {
        this.setdataInArray();
      }
      if (this.rolePermissionById.length > 46) {
        const requestContainer = new UserRoleMasterModel(this.modelObj);
        this.requestForm = this.formBuilder.formGroup(requestContainer);
      }
    }
    ));
  }

  resourceStatus: any = [];
  checkBoxChange(event: any, header: any, accessId: any) {
    let checkBoxStatus = event.target.checked;
    console.log("checkBoxStatus", checkBoxStatus);
    console.log("this is a checkObj", header);

    let resourceId = header.resourceId;
    // console.log("resourceId", this.keyName);
    console.log("resourceId", resourceId);

    if (accessId == 1) {
      let findInArray = this.rolePermissionById.find((x: any) => x.keyName == resourceId || x.resourceId == resourceId);
      if (findInArray !== null) {
        const index = this.rolePermissionById.findIndex((x: any) => x.keyName == resourceId || x.resourceId == resourceId);
        if (index !== -1) {
          if (checkBoxStatus == true) {
            this.rolePermissionById[index] = {
              ...this.rolePermissionById[index],
              canView: true,
              canInsert: true,
              canUpdate: true,
              canDelete: true,
              canApprove: true,
              fullAccess: true,
            };
          } else {
            this.rolePermissionById[index] = {
              ...this.rolePermissionById[index],
              canView: false,
              canInsert: false,
              canUpdate: false,
              canDelete: false,
              canApprove: false,
              fullAccess: false,
            };
          }
        }
      }
    }
    if (accessId == 2) {
      console.log("resourceId", resourceId);
      let findInArray = this.rolePermissionById.find((x: any) => x.keyName == resourceId || x.resourceId == resourceId);
      console.log("findInArray", findInArray);

      if (findInArray !== null) {
        const index = this.rolePermissionById.findIndex((x: any) => x.keyName == resourceId || x.resourceId == resourceId);
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
              fullAccess: false,
            };
          }
        }
        console.log("index", index);
      }
    }
    if (accessId == 3) {
      let findInArray = this.rolePermissionById.find((x: any) => x.keyName == resourceId || x.resourceId == resourceId);
      if (findInArray !== null) {
        const index = this.rolePermissionById.findIndex((x: any) => x.keyName == resourceId || x.resourceId == resourceId);
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
              fullAccess: false,
            };
          }
        }
      }
    }
    if (accessId == 4) {
      let findInArray = this.rolePermissionById.find((x: any) => x.keyName == resourceId || x.resourceId == resourceId);
      if (findInArray !== null) {
        const index = this.rolePermissionById.findIndex((x: any) => x.keyName == resourceId || x.resourceId == resourceId);
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
              fullAccess: false,
            };
          }
        }
      }
    }
    if (accessId == 5) {
      let findInArray = this.rolePermissionById.find((x: any) => x.keyName == resourceId || x.resourceId == resourceId);
      if (findInArray !== null) {
        const index = this.rolePermissionById.findIndex((x: any) => x.keyName == resourceId || x.resourceId == resourceId);
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
              fullAccess: false,
            };
          }
        }
      }
    }
    if (accessId == 6) {
      let findInArray = this.rolePermissionById.find((x: any) => x.keyName == resourceId || x.resourceId == resourceId);
      if (findInArray !== null) {
        const index = this.rolePermissionById.findIndex((x: any) => x.keyName == resourceId || x.resourceId == resourceId);
        if (index !== -1) {
          if (checkBoxStatus == true) {
            this.rolePermissionById[index] = {
              ...this.rolePermissionById[index],
              canApprove: true,
            };
          } else {
            this.rolePermissionById[index] = {
              ...this.rolePermissionById[index],
              canApprove: false,
              fullAccess: false,
            };
          }
        }
      }
    }
    // if (accessId == 7) {
    //   let findInArray = this.rolePermissionById.find((x: any) => x.keyName == resourceId || x.resourceId == resourceId);
    //   if (findInArray !== null) {
    //     const index = this.rolePermissionById.findIndex((x: any) => x.keyName == resourceId || x.resourceId == resourceId);
    //     if (index !== -1) {
    //       if (checkBoxStatus == true) {
    //         this.rolePermissionById[index] = {
    //           ...this.rolePermissionById[index],
    //           canApprove: true,
    //         };
    //       } else {
    //         this.rolePermissionById[index] = {
    //           ...this.rolePermissionById[index],
    //           canApprove: false,
    //           fullAccess: false,
    //         };
    //       }
    //     }
    //   }
    // }
  }

  onSave() {
    let IsValide = false;
    if (this.requestForm.valid) {
      const container = this.requestForm.getRawValue();
      console.log("its save", container);

      if (IsValide == false && !this.roleId) {
        console.log(container);

        if (container.roleName == null || container.roleName == '') {
          return this.service.notify.showSuccess('Role Name is required property');
        }
        if (container.roleDescription == null || container.roleDescription == '') {
          return this.service.notify.showSuccess('Role Description is required property');
        }
        if (container.status == null || container.status == '') {
          return this.service.notify.showSuccess('Status is required property');
        }
      }
      let obj = {
        RoleId: container.roleId || 0,
        RoleName: container.roleName,
        RoleDescription: container.roleDescription,
        UT_RoleResourceAssociation: this.rolePermissionById.map((resource: any) => {
          const {
            bpCode, category, displayText, fullAccess, isActive, keyName, parent, id, canView, canInsert, canUpdate, canDelete, canApprove, resourceId, ...rest
          } = resource;
          //   const { bpCode, category, displayText, fullAccess , isActive , keyName ,parent , id , ...rest } = resource;  // Destructure and exclude param1 and param2
          const modifiedCanView = canView ? true : false;
          const modifiedCanInsert = canInsert ? true : false;
          const modifiedCanUpdate = canUpdate ? true : false;
          const modifiedCanDelete = canDelete ? true : false;
          const modifiedCanApprove = canApprove ? true : false;
          return {
            resourceId,
            canView,
            canInsert,
            canUpdate,
            canDelete,
            canApprove
          };
        }),
        IsActive: 1,
      };
      this.service.SaveRolePermissions(obj).subscribe((responce: any) => {
        if (responce.data[0].status == 200) {
          this.service.notify.showSuccess(responce.data[0].message);
        }
        else if (responce.data[0].status == 0) {
          return this.service.notify.showError(responce.data[0].message);
        }
      });
      this.router.navigate(['/userRoleMaster']);
    }
  }

  onCancel(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        header: "Confirmation",
        message: "Do you want to cancel your changes?"
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.routeUrl.navigate(['/userRoleMaster']);
      }
    });
  }
}
