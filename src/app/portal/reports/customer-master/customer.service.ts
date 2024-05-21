import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseService {
  constructor(injector: Injector) {
    super(injector);
  }
  getOrderReport(reqData: any) {
    return this.api.post<Array<any>>(
      this.apiProxy.Common.getOrderReport(),
      reqData
    );
  }
  saveOrder(ReqData: any) {
    return this.api.post<Array<any>>(this.apiProxy.Common.saveOrder(), ReqData);
  }
  saveCustomer(ReqData: any) {
    return this.api.post<Array<any>>(this.apiProxy.Common.saveCustomer(), ReqData);
  }
  getOrderDetailById(ReqData: any) {
    return this.api.post<Array<any>>(
      this.apiProxy.Common.getOrderDetailById(),
      ReqData
    );
  }
  getOrderListForAdminToAssignManager(ReqData: any) {
    return this.api.get<Array<any>>(
      this.apiProxy.Common.getOrderListForAdminToAssignManager(),
      ReqData
    );
  }
  getOrderListToAssignEmployee(ReqData: any) {
    return this.api.post<Array<any>>(
      this.apiProxy.Common.getOrderListToAssignEmployee(),
      ReqData
    );
  }
  getProductionDataFromOrderId(ReqData: any) {
    return this.api.post<Array<any>>(
      this.apiProxy.Common.getProductionDataFromOrderId(),
      ReqData
    );
  }
  addProduction(ReqData: any) {
    return this.api.post<Array<any>>(
      this.apiProxy.Admin.addProduction(),
      ReqData
    );
  }
  getSellListForGrid(ReqData: any) {
    return this.api.post<Array<any>>(
      this.apiProxy.Admin.getSellListForGrid(),
      ReqData
    );
  }
  getCurrentAvailableSellProdcuts() {
    return this.api.post<Array<any>>(
      this.apiProxy.Admin.getCurrentAvailableSellProdcuts(),
      {}
    );
  }
  addDetailOFMasters(reqData: any) {
    return this.api.post<Array<any>>(
      this.apiProxy.Admin.addDetailOFMasters(),
      reqData
    );
  }
  getCustomerMaster() {
    return this.api.get<Array<any>>(this.apiProxy.Admin.getCustomerMaster());
  }

  getCustomerListForGrid() {
    return this.api.post<Array<any>>(this.apiProxy.Admin.getCustomerListForGrid(),{});
  }

  /////////-- remove all above api and put vendor api. ///////////
  saveTransaction(Data :any){
    return this.api.post<Array<any>>(this.apiProxy.Admin.saveTransaction(),Data);
  }
  GetTransactionListForGrid() {
    return this.api.post<Array<any>>(this.apiProxy.Admin.GetTransactionListForGrid(),{});
  }
}
