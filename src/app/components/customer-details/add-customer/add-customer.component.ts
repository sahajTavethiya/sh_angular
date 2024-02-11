import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { first } from 'rxjs/internal/operators/first';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PaginatorModule } from 'primeng/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxFileDropEntry, NgxFileDropModule, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { LoginService } from '../../../service/login.service';
import { MenuComponent } from '../../header/menu/menu.component';
import { NavComponent } from '../../header/nav/nav.component';
import { environment } from '../../../environment/environment';
// import { } from '@types/googlemaps';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, PaginatorModule, ReactiveFormsModule, NgxFileDropModule, MenuComponent, NavComponent],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent implements OnInit {

  editCustomerForm: FormGroup;

  // autocompleteInput: any;
  // queryWait: any;

  // @Input() adressType: any;
  // @Output() setAddress: EventEmitter<any> = new EventEmitter();
  // @ViewChild('addresstext') addresstext: any;

  constructor(public service: LoginService, public router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.editCustomerForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailId: ['', Validators.required],
      address: ['', Validators.required],
      countryCode: [''],
      ProfilePhoto: [''],
      IsOCR: ['']
    })
  }

  isSidebarActive = false;
  loggedUserName = localStorage.getItem('Name')?.toString();

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  public files: NgxFileDropEntry[] = [];

  RoleId: any;
  dealerId: any;
  delerDetailById: any = [];
  delerDetailByIdData: any;
  imageName: any;

  UrlForCarImage = environment.CDN_URL;
  thumb = environment.Thumb;
  other = environment.OtherPhotoVideo;
  FullUrlForUserImageShow: any;
  isLoading = false;
  ngOnInit(): void {
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    };
    this.FullUrlForUserImageShow = this.UrlForCarImage + this.other + this.thumb;
    this.RoleId = localStorage.getItem('RoleId');
    this.route.queryParams.subscribe((params: any) => {
      this.dealerId = params['delerId'];
    });

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    if (parseInt(this.dealerId) && (parseInt(this.dealerId) !== null || parseInt(this.dealerId) !== undefined)) {
      this.isLoading = true;
      console.log("Deler Id --", this.dealerId);
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      let data = {
        userId: this.dealerId
      }
      this.service.getAllDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
        console.log(data.data);
        this.delerDetailById = [];
        data.data.dataArray.forEach((element: any) => {
          if (element?.ProfilePhoto && (element?.ProfilePhoto !== undefined || element?.ProfilePhoto !== null)) {
            this.imagePath = this.FullUrlForUserImageShow + element.ProfilePhoto;
            this.imageName = element.ProfilePhoto;
            this.delerDetailById.push(element);
            this.delerDetailByIdData = this.delerDetailById[0];
            this.delerDetailById = {
              displayName: this.delerDetailByIdData?.DisplayName,
              phoneNumber: this.delerDetailByIdData?.PhoneNumber,
              countryCode: this.delerDetailByIdData?.CountryCode,
              emailId: this.delerDetailByIdData?.EmailId,
              address: this.delerDetailByIdData?.Address,
              ProfilePhoto: this.delerDetailByIdData?.ProfilePhoto,
              IsOCR: this.delerDetailByIdData?.IsOCR
            }
            this.editCustomerForm.patchValue(this.delerDetailById);
            // });
          } else {
            // element.url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
            this.imagePath = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
            console.log("Not Image for this User", element);
            this.imageName = element.ProfilePhoto;
            this.delerDetailById.push(element);
            console.log("Edit Dealer Profile --", this.delerDetailById);
            this.delerDetailByIdData = this.delerDetailById[0];
            this.delerDetailById = {
              displayName: this.delerDetailByIdData?.DisplayName,
              phoneNumber: this.delerDetailByIdData?.PhoneNumber,
              countryCode: this.delerDetailByIdData?.CountryCode,
              emailId: this.delerDetailByIdData?.EmailId,
              address: this.delerDetailByIdData?.Address,
              ProfilePhoto: this.delerDetailByIdData?.ProfilePhoto,
              IsOCR: this.delerDetailByIdData?.IsOCR
            }
            this.editCustomerForm.patchValue(this.delerDetailById);
          }
        });
        this.isLoading = false;
      }, (error) => {
        console.error(error);
        this.isLoading = false;
      });
    } else {
      this.isLoading = true;
      console.log("Deler Id --", this.dealerId);
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      let data = {
        userId: this.dealerId
      }
      this.service.getAllDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
        console.log(data.data);
        this.delerDetailById = [];
        data.data.dataArray.forEach((element: any) => {
          if (element?.ProfilePhoto && (element?.ProfilePhoto !== undefined || element?.ProfilePhoto !== null)) {
            console.log("User Image --", element.ProfilePhoto);
            this.imagePath = this.FullUrlForUserImageShow + element.ProfilePhoto;
            // this.service.showImageForProfilePic(element.ProfilePhoto).subscribe((response: any) => {
            //   this.imagePath = response.uri;
            console.log("User Image Response --", element);
            this.delerDetailById.push(element);
            // });
            this.isLoading = false;
          } else {
            this.imagePath = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
            console.log("Not Image for this User", element);
            this.delerDetailById.push(element);
          }
        });
      }, (error) => {
        console.error(error);
        this.isLoading = false;
      });
    }
  }

  error = false;

  editCustomer() {
    if (this.editCustomerForm.valid) {
      this.isLoading = true;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `${token}`);

      console.log('Form submitted:', this.editCustomerForm.value);
      let data = {
        userId: parseInt(this.dealerId),
        dealerNumber: null,
        displayName: this.editCustomerForm.value.displayName?.toString() || null,
        middleName: null,
        lastName: null,
        whatsAppNumber: null,
        emailId: this.editCustomerForm.value.emailId?.toString() || null,
        address: this.editCustomerForm.value.address?.toString() || null,
        busName: null,
        busLicNumber: null,
        ifuNumber: null,
        profilePhoto: this.imageName || this.editCustomerForm.value.ProfilePhoto || null,
        cityId: null,
        countryId: 0,
        countryCode: this.editCustomerForm.value.countryCode?.toString() || null,
        latitunde: null,
        longitude: null,
        isActive: 1,
        isOcr: this.editCustomerForm.value?.IsOCR
      }
      console.log(data);
      this.service.editDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
        if (data.status === 200) {
          this.error = false;
          this.isLoading = false;
          this.service.notify.showSuccess(data.message);
          if (this.RoleId === '10') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/customer_detail']);
          }
          if (data.status !== 200) {
            this.error = true;
            this.isLoading = false;
          }
        }
      }, (error: any) => {
        console.error('API error:', error);
        this.isLoading = false;
        // this.errmsg = error.error.message;
        this.error = true;
      });
    } else {
      console.log(this.editCustomerForm.value);
      // if (this.editCustomerForm.value.BussinessName === null || this.editCustomerForm.value.BussinessName === '') {
      //   return this.service.notify.showSuccess('Business Name is required Property');
      // }
      // if (this.editCustomerForm.value.businessLicense === null || this.editCustomerForm.value.businessLicense === '') {
      //   return this.service.notify.showSuccess('Business License is required Property');
      // }
      // if (this.editCustomerForm.value.ifuOfCompany === null || this.editCustomerForm.value.ifuOfCompany === '') {
      //   return this.service.notify.showSuccess('IFU Of Company is required Property');
      // }
      if (this.editCustomerForm.value.displayName === null || this.editCustomerForm.value.displayName === '') {
        return this.service.notify.showSuccess('Display Name is required Property');
      }
      // if (this.editCustomerForm.value.middleName === null || this.editCustomerForm.value.middleName === '') {
      //   return this.service.notify.showSuccess('Middle Name is required Property');
      // }
      // if (this.editCustomerForm.value.lastName === null || this.editCustomerForm.value.lastName === '') {
      //   return this.service.notify.showSuccess('Last Name is required Property');
      // }
      if (this.editCustomerForm.value.emailId === null || this.editCustomerForm.value.emailId === '') {
        return this.service.notify.showSuccess('Email Id is required Property');
      }
      // if (this.editCustomerForm.value.whatsAppNumber === null || this.editCustomerForm.value.whatsAppNumber === '') {
      //   return this.service.notify.showSuccess('WhatsApp Number is required Property');
      // }
      // if (this.editCustomerForm.value.city === null || this.editCustomerForm.value.city === '') {
      //   return this.service.notify.showSuccess('City is required Property');
      // }
      // if (this.editCustomerForm.value.country === null || this.editCustomerForm.value.country === '') {
      //   return this.service.notify.showSuccess('Country is required Property');
      // }
      if (this.editCustomerForm.value.address === null || this.editCustomerForm.value.address === '') {
        return this.service.notify.showSuccess('Address is required Property');
      }
      // if (this.editCustomerForm.value.dealerNumber === null || this.editCustomerForm.value.dealerNumber === '') {
      //   return this.service.notify.showSuccess('Dealer Number is required Property');
      // }
    }
  }


  images: string[] = [];
  maxUploads = 1;
  public flexMaxMessage = false;
  imageNameArray: any[] = [];
  showUserImages: any[] = [];
  imagePath: any = '';

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    console.log(files);

    for (const droppedFile of files) {

      if (droppedFile.fileEntry.isFile) {
        this.isLoading = true;
        if (this.images.length >= this.maxUploads) {
          // Maximum uploads reached
          console.log('Maximum uploads reached');
          this.flexMaxMessage = true;
          break;
        }
        console.log(droppedFile.fileEntry);
        this.images.push(droppedFile.fileEntry.name);
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        console.log("File ENtry --", fileEntry);

        fileEntry.file((file: File) => {
          console.log(file);

          // Create FormData
          const formData = new FormData();
          formData.append('', file);

          const token = localStorage.getItem('token');
          const headers = new HttpHeaders().set('Authorization', `${token}`);
          console.log("Form Data--", formData);

          if (this.isPhoto(file)) {
            this.service.uploadDelearProfilePhoto(formData, { headers }).subscribe((response: any) => {
              console.log('Image profile uploaded successfully', response);
              console.log(response.data.displaypath);
              // this.imagePath = response.data.displaypath;
              this.imageName = response.data.filename;
              this.showUserImages.push({
                url: this.imageName,
                thumb: this.imageName,
              });
              this.imageNameArray.push({
                //  type: 'I',
                //  VehTypeId: 0,
                url: this.imageName,
                thumb: this.imageName,
                //  isMain: 0
              });
              console.log("this is a upload image response", this.imageNameArray);
              this.imagePath = this.FullUrlForUserImageShow + this.imageName;
              // this.service.getImageForProfilePic(this.imageName).subscribe((response: any) => {
              //   console.log("Image Response --", response);
              //   this.imagePath = response.uri;
              console.log(this.imagePath)
              // this.service.showImage(this.imageName).subscribe((response: any) => {
              //   this.imageType = true;
              //   console.log("Image Response --", response);
              //   this.imagePath = response.uri;
              //   this.imageVideoShow.push(this.imagePath);
              // });
              // });
              this.isLoading = false;
            }, (error: any) => {
              console.error('Error uploading image', error);
              this.isLoading = false;
            });
          }
          else {
            console.error('Unsupported file type');
          }
        });
      }
    }

  }
  private isPhoto(file: File): boolean {
    return file.type.startsWith('image/');
  }
  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }

  back() {
    if (this.dealerId === null || this.dealerId === undefined) {
      this.router.navigate(['/customer_detail']);
    } else {
      this.router.navigate(['/customer_profile'], { queryParams: { delerId: this.dealerId } });
    }
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
