import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs/internal/operators/first';
import { LoginService } from '../../../service/login.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment/environment';
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
import { MatDialog } from '@angular/material/dialog';
import { ShowNoDataErrorComponent } from '../../errorDialog/show-no-data-error/show-no-data-error.component';
import { catchError, throwError } from 'rxjs';
import { ConfirmationDialogComponentComponent } from '../../ConfirmationDialogComponent/confirmation-dialog-component/confirmation-dialog-component.component';

@Component({
  selector: 'app-single-dealer-detail',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, PaginatorModule, MatSlideToggleModule, FormsModule, MatInputModule, ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, MatSelectModule, NgbModalModule, MultiSelectModule, FormsModule, DropdownModule, MatAutocompleteModule, SingleDealerDetailComponent],
  templateUrl: './single-dealer-detail.component.html',
  styleUrl: './single-dealer-detail.component.css'
})
export class SingleDealerDetailComponent implements OnInit {

  isSubscribedToEmailsMessage: string = 'Subscribe to Email Notifications';
  changeSubscription: FormGroup;

  constructor(public service: LoginService, readonly router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute, private modalService: NgbModal, public dialog: MatDialog) {
    this.changeSubscription = this.formBuilder.group({
      subscriptionId: ['', Validators.required]
    });
  }

  dealerId: any;

  UrlForCarImage = environment.CDN_URL;
  thumb = environment.Thumb;
  other = environment.OtherPhotoVideo;
  FullUrlForUserImageShow: any;
  canUpdate = false;
  isLoading = false;
  ngOnInit(): void {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    this.service.getloggdUserPermission({ headers }).subscribe((response: any) => {
      let DealerPagePermission = response.data.detail.find((x: any) => x.ResourceId == 20);
      this.isLoading = false;
      if (DealerPagePermission && DealerPagePermission?.CanUpdate == true) {
        this.canUpdate = true
      }
    })
    this.FullUrlForUserImageShow = this.UrlForCarImage + this.other + this.thumb;


    this.route.queryParams.subscribe((params: any) => {
      this.dealerId = params['delerId'];
    });

    this.CarDelerDetail(this.dealerId);
  }

  delerDetailById: any;
  paginateData: Array<any> = [0, 10];
  paginateDataedit: Array<any> = [0, 10];
  totalCount: any;

  addDeler() {
    this.router.navigate([`/addDeler`], { queryParams: { delerId: this.delerId } });
  }

  sotingData(name: any) {
    if (name != "action") {
      this.paginateData[0] = this.paginateDataedit[0];
      this.paginateData[1] = this.paginateDataedit[1];
      this.ngOnInit();
    }

  }
  planChange() {
    this.changeSubscriptionToggle = true;
  }

  changeSubscriptionToggle = false;
  changeSubscriptionPlan() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '400px',
      data: {
        header: "Confirmation",
        message: "Do you want to chnage Subscription Plan ?"
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.isLoading = true;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);

        let data = {
          subscriptionId: this.changeSubscription.value.subscriptionId,
          dealerId: parseInt(this.delerId)
        }
        this.service.chnageSubscription(data, { headers }).subscribe((response: any) => {
          console.log("Change Subscription Plan Data --", response);
          this.isLoading = false;
          if (response.status === 201) {
            this.service.notify.showSuccess(response.message);
          }
          this.CarDelerDetail(this.delerId);
        }, (error) => {
          console.error(error);
          this.isLoading = false;
        });
      }
    });

  }

  delerId: any;
  DealerActive = true;
  CarDelerDetail(id: any) {
    this.isLoading = true;
    this.delerId = id;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    let data = {
      userId: id,
      take: this.paginateData[1],
      skip: this.paginateData[0],
    }
    this.service.getAllDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
      console.log(data.data);
      this.delerDetailById = [];
      data.data.dataArray.forEach((element: any) => {
        this.DealerActive = element.IsActive;
        if (element?.ProfilePhoto && (element?.ProfilePhoto !== undefined || element?.ProfilePhoto !== null)) {
          element.url = this.FullUrlForUserImageShow + element.ProfilePhoto;
          if (element.WhatsAppNumber) {
            let numericPart = element.WhatsAppNumber ? element.WhatsAppNumber.replace(/\D/g, '') : element.WhatsAppNumber;
            element.WhatsAppNumber = `+${numericPart.slice(0, 2)} ${numericPart.slice(2)}`;
          } else { }
          this.delerDetailById.push(element);
        } else {
          element.url = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
          if (element.WhatsAppNumber) {
            let numericPart = element.WhatsAppNumber ? element.WhatsAppNumber.replace(/\D/g, '') : element.WhatsAppNumber;
            element.WhatsAppNumber = `+${numericPart.slice(0, 2)} ${numericPart.slice(2)}`;
          } else { }
          this.delerDetailById.push(element);
        }
      });
      this.isLoading = false;
    });
  }

  subscriptionGetAllPlan: any = [];
  getSubscriptionData() {
    // this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    let subscriptionPlanData = {
      subscriptionId: null,
    }

    this.service.getAllSubScriptionPlan(subscriptionPlanData, { headers }).pipe(first()).subscribe((data: any) => {
      // this.isLoading = false;
      console.log("-------", data.data.planMaster);
      this.subscriptionGetAllPlan = data.data.planMaster;
    });
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

  onToggleChange(item: any): void {
    // if (item.IsActive === true) {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    // item.IsActive = false;
    let data = {
      userId: parseInt(item.Id),
      firstName: item.DisplayName || null,
      // lastName: '' || null,
      // middleName: '' || null,
      displayName: item.DisplayName || null,
      emailId: item.EmailId || null,
      address: item.Address || null,
      busName: item.CompanyName || null,
      busLicNumber: item.BusLicNumber || null,
      dealerNumber: item.DealerNumber || null,
      ifuNumber: item.IFUNumber || null,
      whatsAppNumber: item.WhatsAppNumber || null,
      profilePhoto: item.ProfilePhoto || null,
      // countryId: null,
      // countryCode: null,
      // cityId: null,
      // latitunde: null,
      // longitude: null,
      isActive: item.IsActive === true ? 0 : 1,
      isDeleted: 0
    };

    this.service.editDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
      this.isLoading = false;
      this.CarDelerDetail(parseInt(item.Id));
    });
  }
}
