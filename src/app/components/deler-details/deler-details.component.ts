import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs/internal/operators/first';
import { LoginService } from '../../service/login.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaginatorModule } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ErrorDialogComponent } from '../errorDialog/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ShowNoDataErrorComponent } from '../errorDialog/show-no-data-error/show-no-data-error.component';
import { SingleDealerDetailComponent } from './single-dealer-detail/single-dealer-detail.component';
import { MenuComponent } from '../header/menu/menu.component';
import { NavComponent } from '../header/nav/nav.component';
import { SingleDealerCarListComponent } from './single-dealer-car-list/single-dealer-car-list.component';

@Component({
  selector: 'app-deler-details',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, PaginatorModule, MatSlideToggleModule, FormsModule, MatInputModule, ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, MatSelectModule, NgbModalModule, MultiSelectModule, DropdownModule, MatAutocompleteModule, SingleDealerDetailComponent, MenuComponent, NavComponent, SingleDealerCarListComponent],
  templateUrl: './deler-details.component.html',
  styleUrl: './deler-details.component.css'
})
export class DelerDetailsComponent {

  sotingname: any;
  isChecked: boolean = false;
  changeSubscription: FormGroup;
  isSubscribedToEmailsMessage: string = 'Subscribe to Email Notifications';
  constructor(public service: LoginService, readonly router: Router, private formBuilder: FormBuilder, private modalService: NgbModal, public dialog: MatDialog) {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.allDelerData);
    }, 800);
    this.changeSubscription = this.formBuilder.group({
      subscriptionId: ['', Validators.required]
    });
  }
  isSidebarActive = false;
  subscriptionGetAllPlan: any = [];

  displayedColumns: string[] = ['name', 'phone', 'email', 'companyName', 'dealerId', 'address', 'subscription', 'remainingDays', 'subscriptionStatus', 'userAccountStatus', 'accountCreationDate', 'action'];
  dataSource!: MatTableDataSource<any>;
  loggedUserName = localStorage.getItem('Name')?.toString();

  showAllDeler = true;
  allDelerData: any = [];
  carList: any = [];
  paginateData: Array<any> = [0, 10];
  paginateDataedit: Array<any> = [0, 10];
  totalCount: any;
  totalCarListCount = 0;
  DealerActive = true;
  first: any;
  rows: any;
  brandList: any = [];
  canInsert = false;
  isLoading = false;
  showErrorMessage = false;
  ngOnInit(): void {
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }
    if (typeof localStorage !== 'undefined') {
      this.isLoading = true;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      this.service.getloggdUserPermission({ headers }).subscribe((response: any) => {
        let DealerPagePermission = response.data.detail.find((x: any) => x.ResourceId == 20);
        if (DealerPagePermission && DealerPagePermission?.CanInsert == true) {
          this.canInsert = true
        }
        this.isLoading = false;
      })


      // Role Type Id - Deler - 10 , Customer - 20, Admin - -1
      this.isLoading = true;
      this.getAllDealer();
      
      // this.isLoading = true;
      // this.service.getListForDropDown(0, 10, { headers }).subscribe((response: any) => {
      //   this.brandList = response.data.userDetail;
      //   this.isLoading = false;
      // });



    } else {
      this.paginateData[0] = 0;
      console.error('localStorage is not available.');
    }
  }

  getAllDealer() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    let data = {
      roleTypeId: environment.delerRoleTypeId,
      take: this.paginateData[1],
      skip: this.paginateData[0],
      mobileNo: this.searchInputForDealer || ''
    }
    this.service.getAllDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
      console.log(data.data);
      this.paginateData[0] = 0;
      this.isLoading = false;
      this.allDelerData = data.data.dataArray;
      if (this.allDelerData == undefined) {
        // this.openDialog();
        this.showErrorMessage = true;
      } else {
        this.totalCount = data.data.rowCount;
        this.dataSource = new MatTableDataSource(this.allDelerData);
        console.log("-----------", this.allDelerData);
      }
    });
  }

  openDialog() {
    const data = 'Dealer';
    const dialogRef = this.dialog.open(ShowNoDataErrorComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  delerDetailById: any;
  delerId: any;

  // private cachedData: any[] | undefined;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;

  }
  onToggleChange(item: any): void {
    if (item.IsActive === true) {
      this.isLoading = true;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      item.IsActive = false;
      let data = {
        userId: parseInt(item.Id),
        firstName: item.FirstName || null,
        lastName: item.LastName || null,
        middleName: item.MiddleName || null,
        displayName: item.DisplayName || null,
        emailId: item.EmailId || null,
        address: item.Address || null,
        busName: item.CompanyName || null,
        busLicNumber: item.BusLicNumber || null,
        dealerNumber: item.DealerNumber || null,
        ifuNumber: item.IFUNumber || null,
        whatsAppNumber: item.WhatsAppNumber || null,
        profilePhoto: item.ProfilePhoto || null,
        countryId: null,
        countryCode: null,
        cityId: null,
        latitunde: null,
        longitude: null,
        isActive: 0,
        isDeleted: 0
      };
      console.log("Request Data --", data);

      this.service.editDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
        console.log("-----------", data);
        this.CarDelerDetail(parseInt(item.Id));
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
        countryId: null,
        countryCode: null,
        cityName: null,
        latitunde: null,
        longitude: null,
        isActive: 1,
        isDeleted: 0
      };
      console.log("Request Data --", data);

      this.service.editDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
        console.log("-----------", data);
        this.CarDelerDetail(parseInt(item.Id));
        this.isLoading = false;
      });
    }

    console.log(item);

    console.log('Toggle state changed:', this.DealerActive);

    // Additional logic can be added here based on the toggle state
  }

  CarImageShow(element: any) {
    this.isLoading = true;
    console.log("Img Name --", element.Main_Image_Thumb);
    if (element?.Main_Image_Thumb && (element?.Main_Image_Thumb !== undefined || element?.Main_Image_Thumb !== null)) {
      this.service.showImage(element.Main_Image_Thumb).subscribe((response: any) => {
        element.url = response.uri;
        console.log("Image Response --", element);
        this.carList.push(element);
        this.isLoading = false;
      });
    } else {
      element.url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
      console.log("Not Image", element);
      this.carList.push(element);
    }

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


  // pageSize = 4;
  // onPageChange(event: any) {
  //   const startIndex = event.first;
  //   this.updatePagedCarList(startIndex);
  // }

  // updatePagedCarList(startIndex: number) {
  //   this.carList = this.carList.slice(startIndex, startIndex + this.pageSize);
  // }

  sotingData(name: any) {
    if (name != "action") {
      this.paginateData[0] = this.paginateDataedit[0];
      this.paginateData[1] = this.paginateDataedit[1];
      this.ngOnInit();
    }

  }

  filteredCarList: any[] = [];
  searchTerm = '';

  searchInputForDealer: any = '';
  dealerSearch(event: any) {
    this.isLoading = true;
    console.log(event.target.value);
    this.searchInputForDealer = event.target.value;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    // Role Type Id - Deler - 10 , Customer - 20, Admin - -1
    let data = {
      roleTypeId: environment.delerRoleTypeId,
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
      this.isLoading = false;
      console.log("-----------", this.allDelerData);
    });
    // this.CarDelerDetail(this.delerId);
  }


  CarDelerDetail(id: any) {
    console.log("Clicked");
    this.delerId = id;
    this.router.navigate(['/dealer_details'], { queryParams: { delerId: id } });
  }

  activeTab: string = 'details';

  showDetailsTab() {
    this.activeTab = 'details';
  }

  showCarInventoryTab() {
    this.activeTab = 'carInventory';
  }

  openDialogForCar() {
    const data = 'Car';
    const dialogRef = this.dialog.open(ShowNoDataErrorComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addDeler() {
    console.log("clicked");

    this.router.navigate([`/addDeler`], { queryParams: { delerId: this.delerId } });
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

  getSubscriptionData() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    let subscriptionPlanData = {
      subscriptionId: null,
    }

    this.service.getAllSubScriptionPlan(subscriptionPlanData, { headers }).pipe(first()).subscribe((data: any) => {
      this.isLoading = false;
      console.log("-------", data.data.planMaster);
      this.subscriptionGetAllPlan = data.data.planMaster;
    });
  }

  changeSubscriptionPlan() {
    this.isLoading = true;
    console.log(this.changeSubscription.value);
    console.log(this.delerId);

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    let data = {
      subscriptionId: this.changeSubscription.value.subscriptionId,
      dealerId: this.delerId
    }

    this.service.chnageSubscription(data, { headers }).pipe(first()).subscribe((data: any) => {
      console.log("Change Subscription Plan Data --", data.data);
      // this.modalService.dismissAll();
      this.CarDelerDetail(this.delerId);
      this.isLoading = false;
    });


  }

  CarDetailById(VehicalId: any) {
    console.log("Cliecked", VehicalId, this.delerId);
    this.router.navigate(['/add_car'], { queryParams: { VehicalId: parseInt(VehicalId), delerId: parseInt(this.delerId) } });
  }

  backToDelerPage() {
    this.showAllDeler = true;
  }

  dashboard() {
    this.router.navigate(['/dashboard']);
  }

  addCar() {
    window.open(`/add_car?delerId=${this.delerId}`, '_blank');
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
