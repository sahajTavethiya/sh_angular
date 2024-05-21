import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})  
export class VendorService extends BaseService {

  constructor(injector: Injector) {
    super(injector);
  }
  getOrderReport(reqData: any) {
    return this.api.post<Array<any>>(this.apiProxy.Common.getOrderReport(), reqData);
  }
  saveOrder(ReqData: any) {
    return this.api.post<Array<any>>(this.apiProxy.Common.saveOrder(), ReqData)
  }
  getOrderDetailById(ReqData: any) {
    return this.api.post<Array<any>>(this.apiProxy.Common.getOrderDetailById(), ReqData)
  }

  getOrderListToAssignEmployee(ReqData: any) {
    return this.api.post<Array<any>>(this.apiProxy.Common.getOrderListToAssignEmployee(), ReqData)
  }
  getProductionDataFromOrderId(ReqData: any) {
    return this.api.post<Array<any>>(this.apiProxy.Common.getProductionDataFromOrderId(), ReqData)
  }
  addProduction(ReqData:any){
    return this.api.post<Array<any>>(this.apiProxy.Admin.addProduction(), ReqData)
  }
  getSellListForGrid(ReqData:any){
    return this.api.post<Array<any>>(this.apiProxy.Admin.getSellListForGrid(), ReqData) 
  }
  getCurrentAvailableSellProdcuts(){
    return this.api.post<Array<any>>(this.apiProxy.Admin.getCurrentAvailableSellProdcuts(), {}) 
  }
  addDetailOFMasters(reqData: any) {
    return this.api.post<Array<any>>(this.apiProxy.Admin.addDetailOFMasters(), reqData);
  }
  getVendorListForGrid(reqData:any){
    return this.api.post<Array<any>>(this.apiProxy.Admin.getVendorListForGrid(), reqData);
  }
  saveVendor(reqData:any){
    return this.api.post<Array<any>>(this.apiProxy.Admin.SaveVendor(), reqData);
  }
  

  /////////-- remove all above api and put vendor api. ///////////
}
