import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class MoneyDetailService extends BaseService {

  constructor(injector: Injector) {
    super(injector);
  }
  GetListOfRemainingPaymentToPay(reqData : any){
    return this.api.post<Array<any>>(this.apiProxy.Admin.GetListOfRemainingPaymentToPay(),{})
  }
  GetListOfRemainingPaymentToReceive(reqData : any){
    return this.api.post<Array<any>>(this.apiProxy.Admin.GetListOfRemainingPaymentToReceive(),{})
  }
}