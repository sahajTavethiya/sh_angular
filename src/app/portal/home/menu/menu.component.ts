import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menus: Array<any>;
  DASHBOARD: any;
  oldUrl: string = environment.oldUrl;
  urlAPP = this.oldUrl + '/Account/LoginApp?page='
  token = this.authService.currentUserValue?.token;
  json = JSON.parse(localStorage.getItem('currentUser') || '{}');
  constructor(
    readonly authService: AuthService, readonly router: Router) {
  }

  ngOnInit(): void {
    
    //   let obj =  {
    //     "id": 1002,
    //     "firstName": "manager2",
    //     "roleId": 2,
    //     "emailId": "manager2@gmail.com",
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOjE2OTU4OTM5MTg5MzIsImNyZWF0aW9uRGF0ZVRpbWUiOjE2OTU4OTM5MTg5MzIsImlhdCI6MTY5NTg5MzkxOCwiZXhwIjoxNjk4NDg1OTE4LCJpc3MiOiJ0cmFja2luZyJ9.YXc6BIi0saBHg9ds_5X3Bl6xE0Gewzfie-Bp-b4rhGQ"
    // }
    //   localStorage.setItem('currentUser', json.stringify(obj ));
    this.DASHBOARD = this.urlAPP + "DASHBOARD&token=" + this.authService.currentUserValue?.token;
    this.initialize();
  }

  getLink(name: any) {
    return this.urlAPP + name + "&token=" + this.authService.currentUserValue?.token;
  }

  initialize() {
    this.authService.GetRolePermissions().subscribe((response: any) => {
    this.menus = [];
      // {
      //   displayName: 'User Management', matIcon: 'manage_accounts',
      //   children: [
      //     // { displayName: 'Manage User', matIcon: 'list', url: this.getLink('MANAGEUSER') ,type:0},
      //     // { displayName: 'Manpower Master', matIcon: 'list', url:  this.getLink('MANPOWER') ,type:0}
      //   ]
      // },
      // {
      //   displayName: 'Service Master', matIcon: 'dashboard',
      //   children: [
      //     // { displayName: 'Service Master', matIcon: 'list', url: this.getLink('SERVICEMASTER'),type:0},
      //     // { displayName: 'Service Category', matIcon: 'list', url: this.getLink('SERVICECATEGORY'),type:0},
      //     // { displayName: 'Service Sub Category', matIcon: 'list', url: this.getLink('SUBCATEGORY'),type:0},
      //     // { displayName: 'Material Category Master', matIcon: 'list', url: this.getLink('MATERIALCATEGORY'),type:0},
      //     // { displayName: 'Material Master', matIcon: 'list', url: this.getLink('MATERIALMASTER'),type:0},
      //     // { displayName: 'Control Room Master', matIcon: 'list', url: this.getLink('LOCALITYMASTER'),type:0},
      //     { displayName: 'Bulk Upload Meter Details', matIcon: 'list', url: this.getLink('BULKUPLOADMETER'), type: 0 }
      //   ]
      // },
      // {
      //   displayName: 'Customer', matIcon: 'dashboard',
      //   children: [
      //     { displayName: 'Manage Customer', matIcon: 'list', url: this.getLink('CLIENT'), type: 0 },
      //     { displayName: 'Add Customer', matIcon: 'list', url: '/AddCustomer', type: 1 },
      //     { displayName: 'Manage Meter Numbers', matIcon: 'list', url: '/meter-master', type: 1 },
      //     { displayName: 'Bulk Upload', matIcon: 'list', url: this.getLink('BULKUPLOADCUSTOMER'), type: 0 },
      //     // { displayName: 'Manage Customer Acquisition', matIcon: 'list', url: this.getLink('CUSTOMERACQUISITION'),type:0 },
      //     { displayName: 'Manage Customer Acquisition', matIcon: 'list', url: '/customer-acquisition', type: 1 }

      //   ]
      // },
      // {
      //   displayName: 'Service Requests', matIcon: 'dashboard',
      //   children: [
      //     { displayName: 'Service Requests', matIcon: 'list', url: '/service-requests', type: 1 },
      //     { displayName: 'Bulk Upload', matIcon: 'list', url: this.getLink('BULKUPLOADSR'), type: 0 },
      //     { displayName: 'Bulk Upload Call Details', matIcon: 'list', url: this.getLink('BULKUPLOADCALL'), type: 0 },
      //     { displayName: 'Change SR Status', matIcon: 'list', url: this.getLink('SERVICEREQUESTCHANGESTATUS'), type: 0 },
      //   ]
      // },
      // {
      //   displayName: 'Location Reports', matIcon: 'dashboard',
      //   children: [
      //     { displayName: 'View Manpower Location', matIcon: 'list', url: this.getLink('MANPOWERLOCATIONREPORT'), type: 0 },
      //     { displayName: 'View Manpower Location Details', matIcon: 'list', url: this.getLink('MANPOWERLOCATIONREPORTDETAIL'), type: 0 }
      //   ]
      // },
      // {
      //   displayName: '', matIcon: 'dashboard',
      //   children: [
      //     { displayName: 'Job Work Order', matIcon: 'list', url: '/JobWorkOrder', type: 1 },
      //     { displayName: 'Client Report', matIcon: 'list', url: '/ClientReport', type: 1 },
      //     { displayName: 'Assign Task', matIcon: 'list', url: '/AssignTask', type: 1 },
      //     { displayName: 'Daily Work Report', matIcon: 'list', url: '/DailyWork', type: 1 },
      //   ]
      // },
      if (response.data.result.findIndex((x: any) => (x.resourceId == environment.ResourceMasterIds.JobWorkOrderReport || x.resourceId == environment.ResourceMasterIds.ClientMaster ||
        x.resourceId == environment.ResourceMasterIds.AssignTask || x.resourceId == environment.ResourceMasterIds.DailyWorkStatus ) && x.canView == true) !== -1) {
        let ServiceRequests = {
          displayName: 'Job Work',
          matIcon: 'dashboard',
          children: [{ displayName: 'Job Work Order', matIcon: 'list', url: '/JobWorkOrder', type: 1 },]
        }
        ServiceRequests.children = [];
        if (response.data.result.find((x: any) => x.resourceId == environment.ResourceMasterIds.JobWorkOrderReport)?.canView) {
          let A = { displayName: 'Job Work Order', matIcon: 'list', url: '/JobWorkOrder', type: 1 };
          ServiceRequests.children.push(A)
        };
        if (response.data.result.find((x: any) => x.resourceId == environment.ResourceMasterIds.ClientMaster)?.canView) {
          let A ={ displayName: 'Client Report', matIcon: 'list', url: '/ClientReport', type: 1 };
          ServiceRequests.children.push(A)
        };
        if (response.data.result.find((x: any) => x.resourceId == environment.ResourceMasterIds.AssignTask)?.canView) {
          let A = { displayName: 'Assign Task', matIcon: 'list', url: '/AssignTask', type: 1 };
          ServiceRequests.children.push(A)
        };
        if (response.data.result.find((x: any) => x.resourceId == environment.ResourceMasterIds.DailyWorkStatus)?.canView) {
          let A = { displayName: 'Daily Work Report', matIcon: 'list', url: '/DailyWork', type: 1 };
          ServiceRequests.children.push(A)
        };
        this.menus.push(ServiceRequests)
        
      }
      if (response.data.result.findIndex((x: any) => (x.resourceId == environment.ResourceMasterIds.ManufactureOrderReport || x.resourceId == environment.ResourceMasterIds.VendorMaster ||
        x.resourceId == environment.ResourceMasterIds.CustomerMaster || x.resourceId == environment.ResourceMasterIds.ProductionReport  || x.resourceId == environment.ResourceMasterIds.SellingReport ) && x.canView == true) !== -1) {
        let ServiceRequests = {
          displayName: 'Manufacture',
          matIcon: 'dashboard',
          children: [ { displayName: 'Manufacture Order Report', matIcon: 'list', url: '/OrderReport', type: 1 }]
        }
        ServiceRequests.children = [];
        if (response.data.result.find((x: any) => x.resourceId == environment.ResourceMasterIds.ManufactureOrderReport)?.canView) {
          let A =  { displayName: 'Manufacture Order Report', matIcon: 'list', url: '/OrderReport', type: 1 };
          ServiceRequests.children.push(A)
        };
        if (response.data.result.find((x: any) => x.resourceId == environment.ResourceMasterIds.VendorMaster)?.canView) {
          let A = { displayName: 'Vendor Masters', matIcon: 'list', url: '/Vendor', type: 1 };
          ServiceRequests.children.push(A)
        };
        if (response.data.result.find((x: any) => x.resourceId == environment.ResourceMasterIds.CustomerMaster)?.canView) {
          let A =  { displayName: 'Customer Masters', matIcon: 'list', url: '/Customer', type: 1 };
          ServiceRequests.children.push(A)
        };
        if (response.data.result.find((x: any) => x.resourceId == environment.ResourceMasterIds.ProductionReport)?.canView) {
          let A = { displayName: 'Production Report', matIcon: 'list', url: '/ProductionReport', type: 1 };
          ServiceRequests.children.push(A)
        };
        if (response.data.result.find((x: any) => x.resourceId == environment.ResourceMasterIds.SellingReport )?.canView) {
          let A =   { displayName: 'Sell Report', matIcon: 'list', url: '/Selling', type: 1 };
          ServiceRequests.children.push(A)
        };
        this.menus.push(ServiceRequests)
      }
      if (response.data.result.findIndex((x: any) => (x.resourceId == environment.ResourceMasterIds.WorkerReport || x.resourceId == environment.ResourceMasterIds.StockReport ||
        x.resourceId == environment.ResourceMasterIds.MasterPage  || x.resourceId == environment.ResourceMasterIds.RoleMaster ) && x.canView == true) !== -1) {
        let ServiceRequests = {
          displayName: 'Common Report',
          matIcon: 'dashboard',
          children: [ { displayName: 'Worker Report', matIcon: 'list', url: '/WorkerReport', type: 1 }]
        }
        ServiceRequests.children = [];
        if (response.data.result.find((x: any) => x.resourceId == environment.ResourceMasterIds.WorkerReport)?.canView) {
          let A = { displayName: 'Worker Report', matIcon: 'list', url: '/WorkerReport', type: 1 };
          ServiceRequests.children.push(A)
        };
        if (response.data.result.find((x: any) => x.resourceId == environment.ResourceMasterIds.StockReport)?.canView) {
          let A =  { displayName: 'Stock Report', matIcon: 'list', url: '/StockReport', type: 1 };
          ServiceRequests.children.push(A)
        };
        if (response.data.result.find((x: any) => x.resourceId == environment.ResourceMasterIds.MasterPage)?.canView) {
          let A = { displayName: 'Add Masters', matIcon: 'list', url: '/AddMasters', type: 1 };
          ServiceRequests.children.push(A)
        };
        // if (response.data.result.find((x: any) => x.resourceId == environment.ResourceMasterIds.TransactionMaster)?.canView) {
        //   let A =  { displayName: 'Transaction Masters', matIcon: 'list', url: '/Transaction', type: 1 };
        //   ServiceRequests.children.push(A)
        // };
        if (response.data.result.find((x: any) => x.resourceId == environment.ResourceMasterIds.RoleMaster )?.canView) {
          let A =   { displayName: 'Role Master', matIcon: 'list', url: '/userRoleMaster', type: 1 };
          ServiceRequests.children.push(A)
        };
        let A =   { displayName: 'Get Money From', matIcon: 'list', url: '/GetMoneyFrom', type: 1 };
        let B =   { displayName: 'Give Money To', matIcon: 'list', url: '/PayMoneyTo', type: 1 };
        ServiceRequests.children.push(A)
        ServiceRequests.children.push(B)
        this.menus.push(ServiceRequests)
      }

      if (response.data.result.findIndex((x: any) => (x.resourceId == environment.ResourceMasterIds.TransactionMaster || x.resourceId == environment.ResourceMasterIds.GetMoneyFrom ||
        x.resourceId == environment.ResourceMasterIds.GiveMoneyTo  || x.resourceId == environment.ResourceMasterIds.GetMoneyFrom   || x.resourceId == environment.ResourceMasterIds.EmployeeWorkerReport ) && x.canView == true) !== -1) {
        let ServiceRequests = {
          displayName: 'Account Report',
          matIcon: 'dashboard',
          children: [ { displayName: 'Transaction Report', matIcon: 'list', url: '/Transaction', type: 1 }]
        }
        ServiceRequests.children = [];
        if (response.data.result.find((x: any) => x.resourceId == environment.ResourceMasterIds.TransactionMaster)?.canView) {
          let A = { displayName: 'Transaction Report', matIcon: 'list', url: '/Transaction', type: 1 };
          ServiceRequests.children.push(A)
        };
        if (response.data.result.find((x: any) => x.resourceId == environment.ResourceMasterIds.EmployeeWorkerReport)?.canView) {
          let A = { displayName: 'Employee Work Report', matIcon: 'list', url: '/EmployeeWorkReport', type: 1 };
          ServiceRequests.children.push(A)
        };
        if (response.data.result.find((x: any) => x.resourceId == environment.ResourceMasterIds.GetMoneyFrom)?.canView) {
          let A =   { displayName: 'Get Money From', matIcon: 'list', url: '/GetMoneyFrom', type: 1 };
          ServiceRequests.children.push(A)
        };
        if (response.data.result.find((x: any) => x.resourceId == environment.ResourceMasterIds.GiveMoneyTo)?.canView) {
          let A = { displayName: 'Give Money To', matIcon: 'list', url: '/PayMoneyTo', type: 1 };
          ServiceRequests.children.push(A)
        };
        this.menus.push(ServiceRequests)
      }
      // {
      //   displayName: 'Job Work', matIcon: 'dashboard',
      //   children: [
      //     { displayName: 'Job Work Order', matIcon: 'list', url: '/JobWorkOrder', type: 1 },
      //     { displayName: 'Client Report', matIcon: 'list', url: '/ClientReport', type: 1 },
      //     { displayName: 'Assign Task', matIcon: 'list', url: '/AssignTask', type: 1 },
      //     { displayName: 'Daily Work Report', matIcon: 'list', url: '/DailyWork', type: 1 }
      //   ]
      // },
      // {
      //   displayName: 'Manufactur', matIcon: 'dashboard',
      //   children: [
      //     { displayName: 'Manufacture Order Report', matIcon: 'list', url: '/OrderReport', type: 1 },
      //     { displayName: 'Vendor Masters', matIcon: 'list', url: '/Vendor', type: 1 },
      //     { displayName: 'Customer Masters', matIcon: 'list', url: '/Customer', type: 1 },
      //     { displayName: 'Production Report', matIcon: 'list', url: '/ProductionReport', type: 1 },
      //     { displayName: 'Sell Report', matIcon: 'list', url: '/Selling', type: 1 },
      //   ]
      // }
    
  })
  }

  oldAppClick(URL: any) {
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (json.id) {
      window.open(URL, "_blank");
    } else {
      window.location.reload();
      // this.router.navigate(['/login']);;
      console.log(json)
    }


  }
}
