import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { MenuComponent } from '../../header/menu/menu.component';
import { NavComponent } from '../../header/nav/nav.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../../../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-single-customer-detail',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, PaginatorModule, MatSlideToggleModule, FormsModule, MatInputModule, ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, MatSelectModule, NgbModalModule, MultiSelectModule, DropdownModule, MenuComponent, NavComponent],
  templateUrl: './single-customer-detail.component.html',
  styleUrl: './single-customer-detail.component.css'
})
export class SingleCustomerDetailComponent implements OnInit {

  constructor(public service: LoginService, readonly router: Router, public dialog: MatDialog, private route: ActivatedRoute) { }

  dealerId: any;

  paginateData: Array<any> = [0, 10];
  paginateDataedit: Array<any> = [0, 10];

  isSubscribedToEmailsMessage: string = 'Subscribe to Email Notifications';

  UrlForCarImage = environment.CDN_URL;
  thumb = environment.Thumb;
  other = environment.OtherPhotoVideo;
  FullUrlForUserImageShow: any;
  canUpdateUser = false;
  canUpdateOCR = false;
  isShowOCRModule = false;
  isLoading = false;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.dealerId = params['delerId'];
    });
    this.isLoading = true;
    this.FullUrlForUserImageShow = this.UrlForCarImage + this.other + this.thumb;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    // Role Type Id - Deler - 10 , Customer - 20, Admin - -1.
    this.service.getloggdUserPermission({ headers }).subscribe((response: any) => {
      let CustomerDetailPagePermission = response.data.detail.find((x: any) => x.ResourceId == 50);
      let OCRPagePermission = response.data.detail.find((x: any) => x.ResourceId == 130);
      console.log("its DealerInventoryPagePermission", CustomerDetailPagePermission);

      if (CustomerDetailPagePermission && CustomerDetailPagePermission?.CanUpdate && CustomerDetailPagePermission?.CanUpdate == true) {
        this.isLoading = false;
        this.canUpdateUser = true;
      }
      if (OCRPagePermission && OCRPagePermission?.CanUpdate && OCRPagePermission?.CanUpdate == true) {
        this.isLoading = false;
        this.canUpdateOCR = true;
      }
    }, (error) => {
      console.error(error);
      this.isLoading = false;
    });
    this.isShowOCRModule = environment.isShowOCRModule;
    this.CarDelerDetail(this.dealerId);
  }

  DealerActive = true;
  OcrActive = true;
  delerDetailById: any;
  CarDelerDetail(id: any) {
    this.isLoading = true;
    // this.router.navigate(['/customer_profile', { queryParams: { delerId: id } }])
    console.log("Deler Id --", id);
    this.dealerId = id;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    let data = {
      userId: parseInt(id),
      take: this.paginateData[1],
      skip: this.paginateData[0],
    }
    this.service.getAllDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
      console.log(data.data);
      // this.delerDetailById = data.data.dataArray;
      // console.log("zxcvbnm=---- ", this.delerDetailById);
      this.delerDetailById = [];
      data.data.dataArray.forEach((element: any) => {
        this.DealerActive = element.IsActive;
        this.OcrActive = element.IsOCR;
        if (element?.ProfilePhoto && (element?.ProfilePhoto !== undefined || element?.ProfilePhoto !== null)) {
          console.log("User Image --", element.ProfilePhoto);
          element.url = this.FullUrlForUserImageShow + element.ProfilePhoto;
          // this.service.showImageForProfilePic(element.ProfilePhoto).subscribe((response: any) => {
          //   element.url = response.uri;
          console.log("User Image Response --", element);
          this.delerDetailById.push(element);
          // });
        } else {
          console.log("Not Image for this User", element);
          element.url = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
          this.delerDetailById.push(element);
        }
      });
      this.isLoading = false;
    }, (error) => {
      console.error(error);
      this.isLoading = false;
    });
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
        countryCode: item.CountryCode,
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
        if(data.status === 200) {
          this.service.notify.showSuccess(data.message);
        }
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
        countryCode: item.CountryCode,
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
        if(data.status === 200) {
          this.service.notify.showSuccess(data.message);
        }
        this.CarDelerDetail(parseInt(item.Id));
        this.isLoading = false;
      }, (error) => {
        console.error(error);
        this.isLoading = false;
      });
    }

    console.log(item);

    console.log('Toggle state changed:', this.DealerActive);

  }

  onToggleChangeForOcr(item: any): void {
    if (item.IsOCR === 1) {
      this.isLoading = true;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      item.IsOCR = 0;
      let data = {
        userId: parseInt(item.Id),
        firstName: item.DisplayName || null,
        lastName: '' || null,
        middleName: '' || null,
        displayName: item.DisplayName || null,
        emailId: item.EmailId || null,
        address: item.Address || null,
        countryCode: item.CountryCode,
        busName: item.CompanyName || null,
        busLicNumber: item.BusLicNumber || null,
        dealerNumber: item.DealerNumber || null,
        ifuNumber: item.IFUNumber || null,
        whatsAppNumber: item.WhatsAppNumber || null,
        profilePhoto: item.ProfilePhoto || null,
        isActive: item.IsActive,
        isOcr: 0,
        isDeleted: 0
      };
      console.log("Request Data --", data);

      this.service.editDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
        console.log("-----------", data);
        if(data.status === 200) {
          this.service.notify.showSuccess(data.message);
        }
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
        countryCode: item.CountryCode,
        busName: item.CompanyName || null,
        busLicNumber: item.BusLicNumber || null,
        dealerNumber: item.DealerNumber || null,
        ifuNumber: item.IFUNumber || null,
        whatsAppNumber: item.WhatsAppNumber || null,
        profilePhoto: item.ProfilePhoto || null,
        isActive: item.IsActive,
        isOcr: 1,
        isDeleted: 0
      };
      console.log("Request Data --", data);

      this.service.editDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
        console.log("-----------", data);
        if(data.status === 200) {
          this.service.notify.showSuccess(data.message);
        }
        this.CarDelerDetail(parseInt(item.Id));
        this.isLoading = false;
      }, (error) => {
        console.error(error);
        this.isLoading = false;
      });
    }

    console.log(item);

    console.log('Toggle state changed:', this.OcrActive);

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

  editCustomer() {
    this.router.navigate(['/update_user'], { queryParams: { delerId: this.dealerId } });
  }

}
