import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class OrderReportServiceService extends BaseService {

  constructor(injector: Injector) {
    super(injector);
  }
  getOrderReport(reqData: any) {
    return this.api.post<Array<any>>(this.apiProxy.Common.getOrderReport(), reqData);
  }
  getJobWorkOrderReportGrid(reqData: any) {
    return this.api.post<Array<any>>(this.apiProxy.Common.getJobWorkOrderReportGrid(), reqData);
  }
  saveOrder(ReqData: any) {
    return this.api.post<Array<any>>(this.apiProxy.Common.saveOrder(), ReqData)
  }
  addJobWorkOrder(ReqData: any) {
    return this.api.post<Array<any>>(this.apiProxy.Common.addJobWorkOrder(), ReqData)
  }
  getOrderDetailById(ReqData: any) {
    return this.api.post<Array<any>>(this.apiProxy.Common.getOrderDetailById(), ReqData)
  }
  getOrderListForAdminToAssignManager(ReqData: any) {
    return this.api.post<Array<any>>(this.apiProxy.Common.getOrderListForAdminToAssignManager(), ReqData)
  }
  getOrderListToAssignEmployee(ReqData: any) {
    return this.api.post<Array<any>>(this.apiProxy.Common.getOrderListToAssignEmployee(), ReqData)
  }

  getJobWorkOrderDetailById(reqData : any){
    return this.api.post<Array<any>>(this.apiProxy.Common.getJobWorkOrderDetailById(),reqData)
  }
}
