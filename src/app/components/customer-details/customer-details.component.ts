import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { first } from 'rxjs/internal/operators/first';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../environment/environment';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LazyLoadEvent } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { MatDialog } from '@angular/material/dialog';
import { ShowNoDataErrorComponent } from '../errorDialog/show-no-data-error/show-no-data-error.component';
import { MenuComponent } from '../header/menu/menu.component';
import { NavComponent } from '../header/nav/nav.component';


@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, PaginatorModule, MatSlideToggleModule, FormsModule, MatInputModule, ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, MatSelectModule, NgbModalModule, MultiSelectModule, DropdownModule, MenuComponent, NavComponent],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css',

})
export class CustomerDetailsComponent {
  constructor(public service: LoginService, readonly router: Router, public dialog: MatDialog) {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.allDelerData);
    }, 800);


  }
  isSidebarActive = false;
  loggedUserName = localStorage.getItem('Name')?.toString();

  isSubscribedToEmailsMessage: string = 'Subscribe to Email Notifications';

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  displayedColumns: string[] = ['FirstName', 'phone', 'email', 'address', 'status', 'accountCreationDate', 'action'];
  dataSource!: MatTableDataSource<any>;
  paginateData: Array<any> = [0, 10];
  paginateDataedit: Array<any> = [0, 10];
  showAllDeler = true;
  allDelerData: any = [];
  totalCount: any;
  DealerActive = true;
  canUpdateUser = false;
  isLoading = false;
  showErrorMessage = false;
  ngOnInit(): void {
    // if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
    //   this.router.navigate(['/login']);
    // }
    // if (typeof localStorage !== 'undefined') {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    // Role Type Id - Deler - 10 , Customer - 20, Admin - -1.
    this.service.getloggdUserPermission({ headers }).subscribe((response: any) => {
      let CustomerDetailPagePermission = response.data.detail.find((x: any) => x.ResourceId == 50);
      console.log("its DealerInventoryPagePermission", CustomerDetailPagePermission);
      this.isLoading = false;
      if (CustomerDetailPagePermission && CustomerDetailPagePermission?.CanUpdate && CustomerDetailPagePermission?.CanUpdate == true) {
        console.log("its true, you can update");

        this.canUpdateUser = true;
      }
    }, (error) => {
      console.error(error);
      this.isLoading = false;
    });
    this.isLoading = true;
    this.getAllDealer();
  }

  getAllDealer() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    let data = {
      roleTypeId: environment.customerRoleTypeId,
      take: this.paginateData[1],
      skip: this.paginateData[0],
    }
    this.service.getAllDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
      console.log("Dtaa --", data.data);
      this.allDelerData = data.data.dataArray;
      this.isLoading = false;
      if (this.allDelerData == undefined) {
        // this.openDialog();
        this.showErrorMessage = true;
      } else {
        this.totalCount = data.data.rowCount;
        this.dataSource = new MatTableDataSource(this.allDelerData);
        console.log("qwertyuiop", this.allDelerData);
      }
    }, (error) => {
      console.error(error);
      this.isLoading = false;
    });
  }

  openDialog() {
    const data = 'Customer';
    const dialogRef = this.dialog.open(ShowNoDataErrorComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  delerDetailById: any;
  dealerId: any;
  CarDelerDetail(id: any) {
    console.log("Deler Id --", id);
    this.dealerId = id;
    this.router.navigate(['/customer_profile'], { queryParams: { delerId: id } });
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization', `${token}`);
    // let data = {
    //   userId: parseInt(id),
    //   take: this.paginateData[1],
    //   skip: this.paginateData[0],
    // }
    // this.service.getAllDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
    //   console.log(data.data);
    //   // this.delerDetailById = data.data.dataArray;
    //   // console.log("zxcvbnm=---- ", this.delerDetailById);
    //   this.delerDetailById = [];
    //   data.data.dataArray.forEach((element: any) => {
    //     this.DealerActive = element.IsActive;
    //     if (element?.ProfilePhoto && (element?.ProfilePhoto !== undefined || element?.ProfilePhoto !== null)) {
    //       console.log("User Image --", element.ProfilePhoto);

    //       this.service.showImageForProfilePic(element.ProfilePhoto).subscribe((response: any) => {
    //         element.url = response.uri;
    //         console.log("User Image Response --", element);
    //         this.delerDetailById.push(element);
    //       });
    //     } else {
    //       console.log("Not Image for this User", element);
    //       element.url = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
    //       this.delerDetailById.push(element);
    //     }
    //   });

    // });
    // this.showAllDeler = false;
  }

  onToggleChange(item: any): void {
    if (item.IsActive === true) {
      this.isLoading = true;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      item.IsActive = false;
      let data = {
        userId: parseInt(item.Id),
        firstName: item.DisplayName || null,
        lastName: '' || null,
        middleName: '' || null,
        displayName: item.DisplayName || null,
        emailId: item.EmailId || null,
        address: item.Address || null,
        busName: item.CompanyName || null,
        busLicNumber: item.BusLicNumber || null,
        dealerNumber: item.DealerNumber || null,
        ifuNumber: item.IFUNumber || null,
        whatsAppNumber: item.WhatsAppNumber || null,
        profilePhoto: item.ProfilePhoto || null,
        isActive: 0,
        isDeleted: 0
      };
      console.log("Request Data --", data);

      this.service.editDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
        console.log("-----------", data);
        this.CarDelerDetail(parseInt(item.Id));
        this.isLoading = false;
      }, (error) => {
        console.error(error);
        this.isLoading = false;
      });
      // item.isActive = false;
    } else {
      this.isLoading = true;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      item.IsActive = true;
      let data = {
        userId: parseInt(item.Id),
        firstName: item.DisplayName || null,
        lastName: '' || null,
        middleName: '' || null,
        displayName: item.DisplayName || null,
        emailId: item.EmailId || null,
        address: item.Address || null,
        busName: item.CompanyName || null,
        busLicNumber: item.BusLicNumber || null,
        dealerNumber: item.DealerNumber || null,
        ifuNumber: item.IFUNumber || null,
        whatsAppNumber: item.WhatsAppNumber || null,
        profilePhoto: item.ProfilePhoto || null,
        isActive: 1,
        isDeleted: 0
      };
      console.log("Request Data --", data);

      this.service.editDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
        console.log("-----------", data);
        this.CarDelerDetail(parseInt(item.Id));
        this.isLoading = false;
      }, (error) => {
        console.error(error);
        this.isLoading = false;
      });
    }

    console.log(item);

    console.log('Toggle state changed:', this.DealerActive);

    // Additional logic can be added here based on the toggle state
  }

  searchInputForDealer: any = '';
  dealerSearch(event: any) {
    console.log(event.target.value);
    this.isLoading = true;
    this.searchInputForDealer = event.target.value;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    // Role Type Id - Deler - 10 , Customer - 20, Admin - -1
    let data = {
      roleTypeId: environment.customerRoleTypeId,
      take: this.paginateData[1],
      skip: this.paginateData[0],
      mobileNo: this.searchInputForDealer || ''
    }
    this.service.getAllDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
      console.log(data.data);
      this.paginateData[0] = 0;
      this.allDelerData = data.data.dataArray;
      this.totalCount = data.data.rowCount;
      this.dataSource = new MatTableDataSource(this.allDelerData);
      console.log("-----------", this.allDelerData);
      this.isLoading = false;
    }, (error) => {
      console.error(error);
      this.isLoading = false;
    });
    // this.CarDelerDetail(this.delerId);
  }

  currentPage: number = 0;
  paginate(event: LazyLoadEvent): void {
    this.paginateData[0] = event.first;
    this.paginateData[1] = event.rows;
    this.paginateDataedit[0] = event.first;
    this.paginateDataedit[1] = event.rows;
    if (event.first !== undefined && event.rows !== undefined) {
      this.currentPage = event.first / event.rows * 10;
    }
    this.getAllDealer();
  }

  dateConvert(date: any) {
    if (date !== undefined || date !== null) {
      const dateTime = new Date(date);
      const formattedDate = dateTime.toLocaleDateString('en-GB');
      return formattedDate;
    } else {
      return date;
    }
  }

  CarDetailById() {
    console.log("Cliecked");
    // this.router.navigate(['/carDetail', id]);
  }

  editCustomer() {
    this.router.navigate(['/update_user'], { queryParams: { delerId: this.dealerId } });
  }

  backToDelerPage() {
    this.showAllDeler = true;
  }

  dashboard() {
    this.router.navigate(['/dashboard']);
  }

  delers() {
    this.router.navigate(['/deler']);
  }

  customerDetail() {
    this.router.navigate(['/customer_detail']);
  }

  plan() {
    this.router.navigate(['/subscription']);
  }

  privacy() {
    this.router.navigate(['/privacy_policy']);
  }

  ads() {
    this.router.navigate(['/addAds']);
  }

  logOut() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }
}
