// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-user-master-role-grid',
//   templateUrl: './user-master-role-grid.component.html',
//   styleUrls: ['./user-master-role-grid.component.scss']
// })
// export class UserMasterRoleGridComponent implements OnInit {

//   constructor(readonly router: Router) { }

//   ngOnInit(): void {
//   }

//   addUserMasterRole() {
//     this.router.navigate(['/addUserRoleMaster']);
//   }

// }



import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/library/shared/services/auth.service';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { environment } from 'src/environments/environment.prod';
import { UserMasterRoleService } from './user-master-role.service';
import { UserRoleMasterModel } from 'src/app/library/core/models/user-role-master/user-role-master.model';

@Component({
  selector: 'app-user-master-role-grid',
  templateUrl: './user-master-role-grid.component.html',
  styleUrls: ['./user-master-role-grid.component.scss']
})
export class UserMasterRoleGridComponent implements OnInit {

  constructor(readonly service: UserMasterRoleService, readonly authService: AuthService,
    readonly formBuilder: RxFormBuilder, readonly dialog: MatDialog,
    private routeUrl: Router, readonly router: Router) { }
  materialReceiptId: any

  zones: Array<any>;
  projectName: Array<any>;
  contractList: Array<any>;
  clientList: Array<any>;
  searchForm: FormGroup;
  getbulkSelect: Array<any> = [];
  zonesAll: Array<any> = [];
  blob: any;
  StatusArr: Array<any>;
  customers: Array<any>;
  filteredCustomers: Array<any> = [];
  displayArr: Array<any> = [];
  searchData: any;
  statusIdsName: Array<any> = [];
  zonesName: Array<any> = [];
  projectNameShow: Array<any> = [];
  contractListShow: Array<any> = [];
  clientListShow: Array<any> = [];
  serviceIdsName: Array<any> = [];


  isgeneratePDFs = false;
  selectable = true;
  removable = true;
  addOnBlur = true;
  displayModal: boolean;
  paginateData: Array<any> = [0, 10];
  paginateDataedit: Array<any> = [0, 10];
  totalRecords = 0;
  sotingname = '';
  OrderBy = 'Asc';
  textsearch: any = '';
  isAllSelect: boolean = false;
  dashboardSearch: any;
  showAddUserButton = false;



  searchObject: any = {} // for exel 
  cols = [
    { header: 'Role Name', field: 'roleName' },
    { header: 'Role Description', field: 'roleDescription' },
    { header: 'Created On', field: 'createdOn' },
    { header: 'CreatedBy', field: 'createdBy' },
    { header: 'Status', field: 'status' },
  ]

  ProjectList: any = []
  ngOnInit(): void {
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.service.GetRolePermissions().subscribe((response:any)=>{
       console.log("this is a response",response.data.table);

      this.showAddUserButton = response.data.table.find((obj: any) => obj.resourceId == environment.ResourceMasterIds.RoleMaster)?.canInsert;
    })

    this.initialize();
    this.bindColumns();
    this.bindDropdowns();
   
  }

  initialize() {
    const searchCriteria = new UserRoleMasterModel();
    console.log(searchCriteria);

    this.searchForm = this.formBuilder.formGroup(searchCriteria);

    setTimeout(() => {
      this.search();
    }, 600);

  }
  changeDateFormate(dateString: string) {
    const formattedDate = moment(dateString, 'DD/MM/YYYY').format('DD-MM-YYYY');
    return formattedDate;
  }

  bindDropdowns() {
    const today = new Date();

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 5);

    const formatDate = (date: any) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const todayFormatted = formatDate(today);
    const oneMonthAgoFormatted = formatDate(oneMonthAgo);
    let obj = {
      FromDate: null,
      ToDate: null,
      Skip: 0,
      Take: 500,
      OrderBy: '',
      Search: '',
    }
    this.service.GetRoleListForGrid(obj).subscribe((response: any) => {
      console.log(response);
      this.ProjectList = response.data.result;
      this.totalRecords = response.data.rowCount;
      console.log("All Data --", this.ProjectList);

    })
  }

  bindColumns() {
    this.cols = [
      { header: 'Role Name', field: 'roleName' },
      { header: 'Role Description', field: 'roleDescription' },
      { header: 'Created On', field: 'createdOn' },
    { header: 'CreatedBy', field: 'createdBy' },
      { header: 'Status', field: 'status' }
    ];
  }
  sortOrder: any
  sotingData(name: any) {
    if (name != "action") {
      if (this.sotingname != name) {
        this.sortOrder = 'Asc';
      } else {
        this.sortOrder = this.sortOrder == 'Desc' ? 'Asc' : 'Desc';
      }
      this.sotingname = name;
      this.paginateData[0] = this.paginateDataedit[0];
      this.paginateData[1] = this.paginateDataedit[1];
      this.search();
    }
  }
  searchbox(val: any) {
    this.textsearch = val;
    this.search();
  }
  search() {
    if (this.searchForm.valid) {
      let data = this.searchForm.getRawValue();
      this.displayModal = false;
      this.searchData = {
        FromDate: data.fromDate,
        ToDate: data.toDate,        
        Take: this.paginateData[1],
        Skip: this.paginateData[0],
        OrderBy: this.sotingname  == '' ? '' : this.sotingname + ' ' + this.OrderBy,
        search: this.textsearch,
      }
      this.searchObject = {
        fromDate: data.fromDate,
        ToDate: data.toDate,  
        Take: 5000,
        Skip: 0,
        OrderBy: this.sotingname  == '' ? '' : this.sotingname + ' ' + this.OrderBy
      }
    this.service.GetRoleListForGrid(this.searchData).subscribe((response: any) => {
      if (response && response.data && response.data.result.length > 0) {
        this.ProjectList = response.data.result;
        this.paginateData[0] = 0;
        this.totalRecords = response.data.rowCount;
      }
      else {
        this.ProjectList = [];
        this.paginateData[0] = 0;
        this.totalRecords = 0;
      }
    });
  } else {
    this.service.notify.showError('Please enter the criteria');
  }

  }
  showBasicDialog() {
    this.displayModal = true;
  }
  removeSearching(data: string): void {
    console.log(data)
    const index = this.displayArr.indexOf(data);
    if (index >= 0) {
      var removeData = data.split(':');
      if (removeData[0] == 'Date') {
        console.log(removeData);

        this.searchForm.get('fromDate')?.setValue(null);
        this.searchForm.get('toDate')?.setValue(null);
      } else if (removeData[0] == 'srNumbers') {

      }
      else if (removeData[0] == 'customerIds') {
        this.filteredCustomers = [];
      } else if (removeData[0] == 'Zones') {
        this.searchForm.get('zones')?.setValue(null)
      } else if (removeData[0] == 'ProjectName') {
        this.searchForm.get('projectName')?.setValue(null)
      } else if (removeData[0] == 'ContractList') {
        this.searchForm.get('contractList')?.setValue(null)
      } else if (removeData[0] == 'ClientList') {
        this.searchForm.get('clientList')?.setValue(null)
      } else {
        this.searchForm.get(removeData[0])?.setValue(null);
      }
       this.search();
    }
  }

  paginate(event: LazyLoadEvent): void {
    this.paginateData[0] = event.first;
    this.paginateData[1] = event.rows;
    this.paginateDataedit[0] = event.first;
    this.paginateDataedit[1] = event.rows;
    this.search();

  }

  reset() {
    this.searchForm.reset();
    this.displayArr = [];
    this.filteredCustomers = [];
    this.totalRecords = 0
    this.ProjectList = new Array<UserRoleMasterModel>();
  }
  
  addUserMasterRole() {
    this.router.navigate(['/addUserRoleMaster']);
  }

  exportCSV() {
    let data = this.searchForm.getRawValue();
    this.service.GetRoleListForGrid(this.searchObject).subscribe((response: any) => {
      this.export(response.data.result)
    })
  }
  public export(json: any[]) {

    let data: any = [];
    json.forEach(element => {
      let singalData = {
        'Role Name': element.roleName,
        'Role Description': element.roleDescription,
        'Created On': element.createdOn,
        'Created By' : element.createdBy,
        'Status': element.status,

      }
      data.push(singalData);
    });

    let Dateto = moment(Date.now()).format('DDMMYY');
    const workBook = XLSX.utils.book_new(); // create a new blank book
    const workSheet = XLSX.utils.json_to_sheet(data);
    workSheet["!cols"] = [
      { wch: 15 }, { wch: 18 }, { wch: 21 }, { wch: 15 }, { wch: 25 }, { wch: 30 }, { wch: 15 }]

    XLSX.utils.book_append_sheet(workBook, workSheet, 'MIList'); // add the worksheet to the book
    XLSX.writeFile(workBook, ' ' + Dateto + '.xlsx'); // initiate a file download in browser
  }
}


