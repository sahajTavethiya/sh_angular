import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserMasterRoleService extends BaseService {
  constructor(injector: Injector) {
      super(injector);
  }


SaveRolePermissions(data: any) {
  return this.api.post(this.apiProxy.Common.SaveRolePermissions(), data);
}
GetMaterialCategoryListForGrid(data: any) {
  return this.api.post(this.apiProxy.Common.GetMaterialCategoryListForGrid(), data);
}

GetRolePermissions() {
  return this.api.get(this.apiProxy.Common.GetRolePermissions());
}
GetRoleListForGrid(data: any) {
  return this.api.post(this.apiProxy.Common.GetRoleListForGrid(), data);
}
GetRoleDetailById(id: any) {
  return this.api.get(this.apiProxy.Common.GetRoleDetailById(id));
}
}
