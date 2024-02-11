import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { SingleDealerDetailComponent } from '../single-dealer-detail/single-dealer-detail.component';
import { LoginService } from '../../../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ShowNoDataErrorComponent } from '../../errorDialog/show-no-data-error/show-no-data-error.component';
import { LazyLoadEvent } from 'primeng/api';
import { ConfirmationDialogComponentComponent } from '../../ConfirmationDialogComponent/confirmation-dialog-component/confirmation-dialog-component.component';

@Component({
  selector: 'app-single-dealer-car-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, PaginatorModule, MatSlideToggleModule, FormsModule, MatInputModule, ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, MatSelectModule, NgbModalModule, MultiSelectModule, FormsModule, DropdownModule, MatAutocompleteModule, SingleDealerDetailComponent],
  templateUrl: './single-dealer-car-list.component.html',
  styleUrl: './single-dealer-car-list.component.css'
})
export class SingleDealerCarListComponent implements OnInit {

  constructor(public service: LoginService, readonly router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute, private modalService: NgbModal, public dialog: MatDialog) { }

  dealerId: any;
  delerDetailById: any = [];
  brandList: any = [];

  UrlForCarImage = environment.CDN_URL;
  thumb = environment.Thumb;
  carPhoto = environment.CarPhoto;
  FullUrlForCarImageShow: any;
  canAdd = false;
  canDelete = false;
  canUpdate = false;
  isLoading = false;
  ngOnInit(): void {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    this.service.getloggdUserPermission({ headers }).subscribe((response: any) => {
      console.log("its all permission", response);
      this.isLoading = false;
      let DealerPagePermission = response.data.detail.find((x: any) => x.ResourceId == 30);
      if (DealerPagePermission && DealerPagePermission?.CanInsert == true) {
        this.canAdd = true
      }
      if (DealerPagePermission && DealerPagePermission?.CanDelete && DealerPagePermission?.CanDelete == true) {
        this.canDelete = true
      }
      if (DealerPagePermission && DealerPagePermission?.CanDelete && DealerPagePermission?.CanDelete == true) {
        this.canDelete = true
      }
      if (DealerPagePermission && DealerPagePermission?.CanUpdate && DealerPagePermission?.CanUpdate == true) {
        this.canUpdate = true
      }
    })
    this.route.queryParams.subscribe((params: any) => {
      this.dealerId = params['delerId'];
    });
    this.isLoading = true;
    this.FullUrlForCarImageShow = this.UrlForCarImage + this.carPhoto + this.thumb;
    this.service.getListForDropDown(0, 10, { headers }).subscribe((response: any) => {
      // this.brandList.push(response.data.userDetail);
      this.brandList = response.data.userDetail;
      // let brandListData = response.data.userDetail;
      let brandListData = {
        Id: 0,
        MakerName: 'AllCar'
      };
      this.brandList.unshift(brandListData);
      console.log("Brand List --", this.brandList);

      this.isLoading = false;
    });
    this.isLoading = true;
    this.getdealerCarList();


  }

  paginateData: Array<any> = [0, 10];
  paginateDataedit: Array<any> = [0, 10];
  totalCount: any;

  sotingData(name: any) {
    if (name != "action") {
      this.paginateData[0] = this.paginateDataedit[0];
      this.paginateData[1] = this.paginateDataedit[1];
      this.ngOnInit();
    }

  }

  totalCarListCount = 0;
  carList: any = [];
  carListEmptyError = false;
  getdealerCarList() {
    // this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    let CarData = {
      take: this.paginateData[1],
      skip: this.paginateData[0],
      VehicalId: 0,
      DealerId: parseInt(this.dealerId),
      filterString: ''
    }
    if (this.filterStringForCar !== '') {
      CarData.filterString = `${environment.CarSearchForBrand}?${this.filterStringForCar}`
    }

    this.service.getAllCar(CarData, { headers }).pipe(first()).subscribe((data: any) => {
      console.log("Get All Car List --", data.data.carList);
      this.isLoading = false;
      this.carList = []; //data.data.carList;
      this.totalCarListCount = data.data.rowCount;
      if (data.data.carList.length === 0) {
        // this.openDialogForCar();
        this.carListEmptyError = true;
      } else {
        this.carListEmptyError = false;
        data.data.carList.forEach((element: any) => {
          if (element?.Main_Image_Url && (element?.Main_Image_Url !== undefined || element?.Main_Image_Url !== null)) {
            element.url = this.FullUrlForCarImageShow + element.Main_Image_Url;
            this.carList.push(element);
          } else {
            element.url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
            this.carList.push(element);
          }
        });
      }
    });
  }


  filterStringForCar: any = '';
  searchCar(event: any) {
    if (event.value === 0) {
      this.filterStringForCar = ''
    } else {
      this.filterStringForCar = event.value;
    }
    this.getdealerCarList();
  }

  CarDetailById(VehicalId: any) {
    this.router.navigate(['/add_car'], { queryParams: { VehicalId: parseInt(VehicalId), delerId: parseInt(this.dealerId) } });
  }

  deleteCar(carId: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '400px',
      data: {
        header: "Confirmation",
        message: "Do you want to Delete ?"
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.isLoading = true;
        let CarId = parseInt(carId);
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);

        let data = {
          vehId: CarId
        }
        this.service.deleteCarById(data, { headers }).subscribe((response: any) => {
          console.log(response);
          this.getdealerCarList();
          this.isLoading = false;
          this.service.notify.showError('Car Deleted Successfully');
        });
      }
    });
  }

  currentPage: number = 0;
  paginateForCarList(event: LazyLoadEvent): void {
    this.paginateData[0] = event.first;
    this.paginateData[1] = event.rows;
    this.paginateDataedit[0] = event.first;
    this.paginateDataedit[1] = event.rows;
    if (event.first !== undefined && event.rows !== undefined) {
      this.currentPage = event.first / event.rows * 10;
    }
    this.getdealerCarList();
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

  addCar() {
    window.open(`/add_car?delerId=${this.dealerId}`, '_blank');
  }

}
