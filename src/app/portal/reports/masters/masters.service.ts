import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class MastersService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }
  addDetailOFMasters(reqData: any) {
    return this.api.post<Array<any>>(this.apiProxy.Admin.addDetailOFMasters(), reqData);
  }
}
