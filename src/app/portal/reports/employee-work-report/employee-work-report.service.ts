import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeWorkReportService  extends BaseService {

  constructor(injector: Injector) {
    super(injector);
  }
  getWorkerAccountReport(reqData : any){
    return this.api.post<Array<any>>(this.apiProxy.Common.getWorkerAccountReport(),reqData)
  }
}
