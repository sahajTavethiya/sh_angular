import { Injectable, Injector } from '@angular/core';
import { BaseService } from 'src/app/library/shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService {

  constructor(injector: Injector) {
    super(injector);
  }

  searchDashboard(criteria: any) {
    return this.api.post(this.apiProxy.ServiceRequest.dashboard(), criteria);
  }
  getAllDashborad(criteria: any) {
    return this.api.get(this.apiProxy.ServiceRequest.getAllDashborad(), criteria);
  }
}
