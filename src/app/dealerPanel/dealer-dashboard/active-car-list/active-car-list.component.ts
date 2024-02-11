import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, ActivatedRoute } from '@angular/router';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { HeaderComponent } from '../../menu/header/header.component';
import { MenuComponent } from '../../menu/menu.component';
import { HttpHeaders } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';
import { environment } from '../../../environment/environment';
import { first } from 'rxjs';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-active-car-list',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, CommonModule, RouterOutlet, RouterLink, RouterLinkActive, CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, PaginatorModule, MatSlideToggleModule, FormsModule, MultiSelectModule, DropdownModule, MatAutocompleteModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, NgbModalModule],
  templateUrl: './active-car-list.component.html',
  styleUrl: './active-car-list.component.css'
})
export class ActiveCarListComponent {
  constructor(public service: LoginService, public router: Router, private route: ActivatedRoute) { }

  dealerId: any;
  totalCount: any = 0;
  brandList: any = [];

  UrlForCarImage = environment.CDN_URL;
  thumb = environment.Thumb;
  carPhoto = environment.CarPhoto;
  FullUrlForCarImageShow: any;
  isLoading = false;
  ngOnInit(): void {
    this.FullUrlForCarImageShow = this.UrlForCarImage + this.carPhoto + this.thumb;

    this.getDealerById();

    this.dealerId = localStorage.getItem('DealerId');

    this.isLoading = true;
    this.getdealerCarList();
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    this.service.getListForDropDown(0, 10, { headers }).subscribe((response: any) => {
      this.brandList = response.data.userDetail;
      this.isLoading = false;
    });

  }

  sotingData(name: any) {
    if (name != "action") {
      this.paginateData[0] = this.paginateDataedit[0];
      this.paginateData[1] = this.paginateDataedit[1];
      this.ngOnInit();
    }

  }
  userActive: any;
  userName: any;
  carAddButtonStatus = false;
  getDealerById() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    let data = {};
    this.service.getDealerById(data, { headers }).pipe(first()).subscribe((data: any) => {
      this.userActive = data.data[0].IsActive;
      this.userName = data.data[0].DisplayName;
      if (this.userActive === false) {
        this.carAddButtonStatus = true;
        this.service.notify.showLongSuccess(`Hello ${this.userName}, your account is inactive, contact our customer service team to help reactivate your account`);
      }
      this.isLoading = false;
    });
  }

  filterStringForCar: any = '';
  searchCar(event: any) {
    console.log(event.value);
    this.filterStringForCar = event.value;
    this.getdealerCarList();
  }

  paginateData: Array<any> = [0, 10];
  paginateDataedit: Array<any> = [0, 10];

  paginate(event: LazyLoadEvent): void {
    this.paginateData[0] = event.first;
    this.paginateData[1] = event.rows;
    this.paginateDataedit[0] = event.first;
    this.paginateDataedit[1] = event.rows;
    this.getdealerCarList();

  }

  addCar() {
    window.open(`/add_car?delerId=${this.dealerId}`, '_blank');
  }

  carList: any;
  carListEmptyError = false;
  getdealerCarList() {
    // this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    let CarData = {
      take: this.paginateData[1],
      skip: this.paginateData[0],
      // take: 100,
      // skip: 0,
      VehicalId: 0,
      DealerId: parseInt(this.dealerId),
      filterString: ''
    }
    if (this.filterStringForCar !== '') {
      CarData.filterString = `${environment.CarSearchForBrand}?${this.filterStringForCar}`
    }
    this.service.getAllCar(CarData, { headers }).pipe(first()).subscribe((data: any) => {
      console.log("Get All Car List --", data.data.carList);

      this.carList = [] //data.data.carList;
      this.totalCount = data.data.rowCount;
      if (data.data.carList.length === 0) {
        this.carListEmptyError = true;
      } else {
        data.data.carList.forEach((element: any) => {
          if (element.IsActive === true) {
            if (element?.Main_Image_Url && (element?.Main_Image_Url !== undefined || element?.Main_Image_Url !== null)) {
              element.url = this.FullUrlForCarImageShow + element.Main_Image_Url;
              console.log("Image Response --", element);

              this.carList.push(element);
            } else {
              element.url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
              console.log("Not Image", element);
              this.carList.push(element);
            }
          }
          // this.CarImageShow(element);
        });
      }
      this.isLoading = false;
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

  CarDetailById(VehicalId: any) {
    console.log("Cliecked", VehicalId, this.dealerId);
    this.router.navigate(['/add_car'], { queryParams: { VehicalId: VehicalId, delerId: parseInt(this.dealerId) } });
  }

  deleteCar(carId: any) {
    this.isLoading = true;
    let CarId = parseInt(carId);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    let data = {
      vehId: CarId
    }
    this.service.deleteCarById(data, { headers }).subscribe((response: any) => {
      console.log(response);
      this.isLoading = false;
      this.getdealerCarList();
    });
  }
}
