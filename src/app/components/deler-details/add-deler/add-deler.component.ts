import { Component, ElementRef, NgZone, OnInit, ViewChild, Inject } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/internal/operators/first';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxFileDropEntry, NgxFileDropModule, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ChangeDetectorRef } from '@angular/core';
// npm install ngx-google-places-autocomplete@latest
import * as turf from '@turf/turf';

import { geolib } from './geolib';
import { ApiService, Maps } from '../../../service/GooglePlace/api.service';
import { MatInputModule } from '@angular/material/input';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { MenuComponent } from '../../header/menu/menu.component';
import { NavComponent } from '../../header/nav/nav.component';
import { environment } from '../../../environment/environment';

const place = null as unknown as google.maps.places.PlaceResult;
type Components = typeof place.address_components;
@Component({
  selector: 'app-add-deler',
  standalone: true,
  providers: [ApiService],
  imports: [ReactiveFormsModule, CommonModule, NgxFileDropModule, MatInputModule, MultiSelectModule, DropdownModule, MenuComponent, NavComponent],
  templateUrl: './add-deler.component.html',
  styleUrl: './add-deler.component.css'
})
export class AddDelerComponent implements OnInit {
  @ViewChild('search')
  public searchElementRef!: ElementRef;

  @ViewChild('map')
  public mapElementRef!: ElementRef;

  public entries: any = [];

  public place: google.maps.places.PlaceResult | undefined;

  public locationFields = [
    'name',
    'cityName',
    'stateCode',
    'countryName',
    'countryCode',
  ];

  private map!: google.maps.Map;

  addDelerForm: FormGroup;
  editDelerForm: FormGroup;

  isSidebarActive = false;
  public files: NgxFileDropEntry[] = [];

  public maxUploads = 1;
  public flexMaxMessage = false;
  imageNameArray: any[] = [];
  public images: string[] = [];
  imagePath: any = '';
  imageName: any;
  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
  constructor(public service: LoginService, public router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute, private ngZone: NgZone, public apiService: ApiService, private cdRef: ChangeDetectorRef) {
    apiService.api.then((maps) => {
      this.initAutocomplete(maps);
      //this.initMap(maps);
    });
    this.addDelerForm = this.formBuilder.group({
      businessLicense: [''],
      dealerId: ['', Validators.required],
      ifuOfCompany: ['', Validators.required],
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      emailId: [''],
      mobileNo: ['', Validators.required],
      countryCode: ['', Validators.required],
      whatsappNo: [''],
      countryCodeForWP: [''],
      password: ['', Validators.required],
      cPassword: ['', Validators.required],
      address: ['', Validators.required],
      BussinessName: ['', Validators.required],
      siteWeb: [''],
      countryId: [''],
      cityId: ['']
    });

    this.editDelerForm = this.formBuilder.group({
      firstName: [''],
      middleName: [''],
      lastName: [''],
      displayName: [''],
      whatsAppNumber: [''],
      countryCodeForWP: [''],
      emailId: [''],
      address: ['', Validators.required],
      BussinessName: [''],
      busLicNumber: [''],
      ifuNumber: ['', Validators.required],
      dealerNumber: ['', Validators.required],
      country: [''],
      city: [''],
      IsActive: ['']
    });
  }

  delerId: any;
  delerDetailById: any = [];
  delerDetailByIdData: any;
  RoleId: any;
  countriesName: any = [];
  countriesData: any = [];
  profilePhoto: any;
  UrlForCarImage = environment.CDN_URL;
  thumb = environment.Thumb;
  other = environment.OtherPhotoVideo;
  FullUrlForUserImageShow: any;
  isLoading = false;
  countryCodes: any = [];
  ngOnInit(): void {
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    };
    this.FullUrlForUserImageShow = this.UrlForCarImage + this.other + this.thumb;
    this.RoleId = localStorage.getItem('RoleId');
    console.log("Role Id --", this.RoleId);

    this.route.queryParams.subscribe((params: any) => {
      this.delerId = params['delerId'];
    });
    this.isLoading = true;
    this.service.getAllCountries().pipe(first()).subscribe((response: any) => {
      this.countriesData = response.data.userDetail;
      console.log(this.countriesData);
      this.isLoading = false;
    });
    this.isLoading = true;
    this.service.getCountriesCode().pipe(first()).subscribe((response: any) => {
      console.log(response);
      this.countriesName = response;
      this.isLoading = false;
    });

    this.service.getCountriesCode().pipe(first()).subscribe((response: any) => {
      this.countryCodes = response;
    });


    console.log("Dealer Idddddddddd --", this.delerId);

    if (parseInt(this.delerId) && (parseInt(this.delerId) !== 0 || parseInt(this.delerId) !== undefined)) {
      console.log("Deler Id --", this.delerId);
      this.isLoading = true;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      let data = {
        userId: this.delerId
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
            this.delerDetailByIdData = this.delerDetailById[0];
            console.log("III", this.delerDetailByIdData);
            this.delerDetailById = {
              firstName: this.delerDetailByIdData?.FirstName || '',
              middleName: this.delerDetailByIdData?.MiddleName || '',
              lastName: this.delerDetailByIdData?.LastName || '',
              displayName: this.delerDetailByIdData?.DisplayName || '',
              whatsAppNumber: this.delerDetailByIdData?.WhatsAppNumber || '',
              countryCodeForWP: this.delerDetailByIdData?.WhatsAppNumber || '',
              emailId: this.delerDetailByIdData?.EmailId || '',
              address: this.delerDetailByIdData?.Address || '',
              BussinessName: this.delerDetailByIdData?.BussinessName || '',
              busLicNumber: this.delerDetailByIdData?.BusLicNumber || '',
              ifuNumber: this.delerDetailByIdData?.IFUNumber || '',
              dealerNumber: this.delerDetailByIdData?.DealerNumber || '',
              country: parseInt(this.delerDetailByIdData?.CountryId),
              // countryCode: this.delerDetailByIdData?.CountryCode || '',
              city: this.delerDetailByIdData?.CityName || '',
              IsActive: 1
            }
            const whatsappNumberParts = this.delerDetailByIdData?.WhatsAppNumber ? this.delerDetailByIdData?.WhatsAppNumber.split('-') : '';
            const countryCodeForWp = whatsappNumberParts[0];
            const phoneNumberForWp = whatsappNumberParts[1];
            this.delerDetailById.whatsAppNumber = phoneNumberForWp || '';
            this.delerDetailById.countryCodeForWP = countryCodeForWp || '';
            this.address = this.delerDetailByIdData?.Address;
            this.imageName = this.delerDetailByIdData?.ProfilePhoto;
            this.latitude = this.delerDetailByIdData.Latitude;
            this.longitude = this.delerDetailByIdData.Longitude;
            console.log("this is a latitude", this.latitude);

            console.log("this is a dealer detail", this.delerDetailById);

            this.editDelerForm.setValue(this.delerDetailById);
            console.log("this is a editForm", this.editDelerForm.value);

            this.countryId = parseInt(this.editDelerForm.value.country);
            console.log(this.countryId);
            // });
          } else {
            this.imagePath = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
            console.log("Not Image for this User", element);
            this.delerDetailById.push(element);
            console.log("Edit Dealer Profile --", this.delerDetailById);
            this.delerDetailByIdData = this.delerDetailById[0];
            this.delerDetailById = {
              firstName: this.delerDetailByIdData?.FirstName || '',
              middleName: this.delerDetailByIdData?.MiddleName || '',
              lastName: this.delerDetailByIdData?.LastName || '',
              displayName: this.delerDetailByIdData?.DisplayName || '',
              whatsAppNumber: this.delerDetailByIdData?.WhatsAppNumber || '',
              countryCodeForWP: this.delerDetailByIdData?.WhatsAppNumber || '',
              emailId: this.delerDetailByIdData?.EmailId || '',
              address: this.delerDetailByIdData?.Address || '',
              BussinessName: this.delerDetailByIdData?.BussinessName || '',
              busLicNumber: this.delerDetailByIdData?.BusLicNumber || '',
              ifuNumber: this.delerDetailByIdData?.IFUNumber || '',
              dealerNumber: this.delerDetailByIdData?.DealerNumber || '',
              country: parseInt(this.delerDetailByIdData?.CountryId),
              city: this.delerDetailByIdData?.CityName || '',
              IsActive: 1
            }
            const whatsappNumberParts = this.delerDetailByIdData?.WhatsAppNumber ? this.delerDetailByIdData?.WhatsAppNumber.split('-') : '';
            const countryCodeForWp = whatsappNumberParts[0];
            const phoneNumberForWp = whatsappNumberParts[1];
            this.delerDetailById.whatsAppNumber = phoneNumberForWp || '';
            this.delerDetailById.countryCodeForWP = countryCodeForWp || '';
            this.imageName = this.delerDetailByIdData?.ProfilePhoto;
            this.address = this.delerDetailByIdData?.Address;
            this.latitude = this.delerDetailByIdData.Latitude;
            this.longitude = this.delerDetailByIdData.Longitude;
            this.editDelerForm.setValue(this.delerDetailById);
            this.countryId = parseInt(this.editDelerForm.value.country);
            console.log(this.countryId);
          }
        });
        this.isLoading = false;
      });
    } else {
      console.log("Deler Id --", this.delerId);
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      let data = {
        userId: this.delerId
      }
      this.imagePath = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
      // this.service.getAllDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
      //   console.log("--",data.data);
      //   this.delerDetailById = [];
      //   data.data.dataArray.forEach((element: any) => {
      //     if (element?.ProfilePhoto && (element?.ProfilePhoto !== undefined || element?.ProfilePhoto !== null)) {
      //       console.log("User Image --", element.ProfilePhoto);

      //       this.service.showImageForProfilePic(element.ProfilePhoto).subscribe((response: any) => {
      //         this.imagePath = response.uri;
      //         console.log("User Image Response --", element);
      //         this.delerDetailById.push(element);
      //       });
      //     } else {
      //       this.imagePath = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
      //       console.log("Not Image for this User", element);
      //       this.delerDetailById.push(element);
      //     }
      //   });
      // });
    }
  }
  latitude: any;
  longitude: any;
  country: any;
  city: any;
  countryCode: any;
  countryId: any;
  address: any;

  onAddressInputChange(event: Event) {
    this.apiService.api.then((maps) => {
      this.initAutocomplete(maps);
      //this.initMap(maps);
    });
    console.log('Address input changed:', (event.target as HTMLInputElement).value);
  }

  initAutocomplete(maps: Maps) {
    console.log("its in autoComplete");

    let autocomplete = new maps.places.Autocomplete(
      this.searchElementRef?.nativeElement
    );
    autocomplete.addListener('place_changed', () => {
      var place = autocomplete.getPlace();
      console.log(place);
      if (place && place.address_components && place.geometry) {
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();

        this.address = place.formatted_address;

        console.log("Address --", this.address);


        this.country = this.getAddressComponent(place.address_components, 'country');
        console.log("Country --", this.country);

        let countryCodeObj = this.countriesName.find((x: any) => x.name == this.country);

        console.log(countryCodeObj);
        this.countryCode = countryCodeObj.dial_code;
        this.addDelerForm.get('countryCode')?.setValue(this.countryCode.toString());
        this.editDelerForm.get('countryCode')?.setValue(this.countryCode.toString());

        let countryIdObj = this.countriesData.find((x: any) => x.CountryName === this.country);

        console.log(countryIdObj);
        this.countryId = countryIdObj.Id;
        this.addDelerForm.get('countryId')?.patchValue(countryIdObj.Id);
        this.editDelerForm.get('country')?.patchValue(countryIdObj.Id);
        this.cdRef.detectChanges();
        console.log("---", this.addDelerForm.value.countryId);



        this.city = this.getAddressComponent(place.address_components, 'locality') || this.getAddressComponent(place.address_components, 'administrative_area_level_1');
        console.log(this.city);
        if (this.city) {
          this.addDelerForm.get('cityId')?.setValue(this.city);
          this.editDelerForm.get('city')?.setValue(this.city);
        }

      }
      // this.ngZone.run(() => {
      // });
    });

  }
  private getAddressComponent(components: google.maps.GeocoderAddressComponent[], type: string): string | null {
    const component = components.find(c => c.types.includes(type));
    return component ? component.long_name : null;
  }

  remove(entry: any) {
    entry.marker.setMap(null);
    entry.rectangle.setMap(null);
    entry.expandedRectangle.setMap(null);
    entry.ellipse.setMap(null);
    this.entries = this.entries.filter((e: any) => e !== entry);
  }

  pin(color: any) {
    return {
      path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
      fillColor: color,
      fillOpacity: 1,
      strokeColor: '#000',
      strokeWeight: 2,
      scale: 1,
    };
  }
  public locationFromPlace(place: google.maps.places.PlaceResult | undefined) {
    if (!place?.geometry) {
      return null;
    }

    const components = place.address_components;
    if (!components) {
      return null;
    }

    const areaLevel3 = getShort(components, 'administrative_area_level_3');
    const locality = getLong(components, 'locality');

    const cityName = locality || areaLevel3;
    const countryName = getLong(components, 'country');
    const countryCode = getShort(components, 'country');
    const stateCode = getShort(components, 'administrative_area_level_1');
    const name = place.name !== cityName ? place.name : null;

    const coordinates = {
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
    };

    const bounds = place.geometry.viewport?.toJSON();
    return {
      name,
      cityName,
      countryName,
      countryCode,
      stateCode,
      bounds,
      coordinates,
    };
  }
  loggedUserName = localStorage.getItem('Name')?.toString();
  error = false;
  errmsg: any;
  addDeler() {
    console.log(this.addDelerForm);

    if (this.addDelerForm.valid) {
      this.isLoading = true;
      console.log("Add delear form Value", this.addDelerForm.value);

      if (this.addDelerForm.value.password !== this.addDelerForm.value.cPassword) {
        this.isLoading = false;
        return this.service.notify.showSuccess('Password and Confirm Password not Match!!!');
      }

      if (this.addDelerForm.value.whatsappNo && !this.addDelerForm.value.countryCodeForWP) {
        this.isLoading = false;
        return this.service.notify.showSuccess('Country Code For Whatsapp Number is required Property');
      }

      if (!this.addDelerForm.value.whatsappNo && this.addDelerForm.value.countryCodeForWP) {
        this.isLoading = false;
        return this.service.notify.showSuccess(`Whatsapp Number is required Property`);
      }

      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `${token}`);

      console.log('Form submitted:', this.addDelerForm.value);
      let data = {
        busLicNumber: this.addDelerForm.value.businessLicense?.toString() || null,
        dealerNumber: this.addDelerForm.value.dealerId?.toString() || null,
        ifuNumber: this.addDelerForm.value.ifuOfCompany?.toString() || null,
        firstName: this.addDelerForm.value.fName?.toString() || null,
        lastName: this.addDelerForm.value.lName?.toString() || null,
        emailId: this.addDelerForm.value.emailId?.toString() || null,
        mobileNo: this.addDelerForm.value.mobileNo?.toString() || null,
        whatsAppNumber: `${this.addDelerForm.value.countryCodeForWP?.toString()}-${this.addDelerForm.value.whatsappNo?.toString()}` || null,
        password: this.addDelerForm.value.password || '',
        address: this.address == null ? this.addDelerForm.value.address : this.address,
        busName: this.addDelerForm.value.BussinessName?.toString() || null,
        siteWeb: this.addDelerForm.value.siteWeb || null,
        profilePhoto: this.imageName || this.profilePhoto,
        cityName: this.city,
        countryId: this.countryId,
        countryCode: this.addDelerForm.value.countryCode || this.countryCode,
        latitude: this.latitude?.toString() || null,
        longitude: this.longitude?.toString() || null,
        isActive: 1
      }
      console.log(data);
      this.service.addDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
        if (data.status === 200) {
          this.error = false;
          this.isLoading = false;
          this.router.navigate(['/deler']);
          this.service.notify.showError('Dealer Added Successfully');
        }
        else if (data.status === 409) {
          this.error = true;
          this.isLoading = false;
          this.service.notify.showSuccess(data.message);
        } else {
          this.error = true;
          this.isLoading = false;
          this.service.notify.showSuccess('Unexpected Error Occurred');
        }
      }, (error: any) => {
        console.error('API error:', error);
        this.isLoading = false;
        // this.errmsg = error.error.message;
        this.error = true;
        if (error.error.status === 409) {
          this.service.notify.showSuccess(error.error.message);
        }
      });
    } else {
      console.log("--", this.addDelerForm.value);
      if (this.addDelerForm.value.BussinessName === null || this.addDelerForm.value.BussinessName === '') {
        return this.service.notify.showSuccess('Business Name is required Property');
      }
      // if (this.addDelerForm.value.businessLicense === null || this.addDelerForm.value.businessLicense === '') {
      //   return this.service.notify.showSuccess('Business License is required Property');
      // }
      if (this.addDelerForm.value.ifuOfCompany === null || this.addDelerForm.value.ifuOfCompany === '') {
        return this.service.notify.showSuccess('IFU Of Company is required Property');
      }
      if (this.addDelerForm.value.fName === null || this.addDelerForm.value.fName === '') {
        return this.service.notify.showSuccess('First Name is required Property');
      }
      if (this.addDelerForm.value.lName === null || this.addDelerForm.value.lName === '') {
        return this.service.notify.showSuccess('Last Name is required Property');
      }
      // if (this.addDelerForm.value.emailId === null || this.addDelerForm.value.emailId === '') {
      //   return this.service.notify.showSuccess('Email Id is required Property');
      // }
      if (this.addDelerForm.value.countryCode === null || this.addDelerForm.value.countryCode === '') {
        return this.service.notify.showSuccess('Country Code is required Property');
      }
      if (this.addDelerForm.value.mobileNo === null || this.addDelerForm.value.mobileNo === '') {
        return this.service.notify.showSuccess('Mobile Number is required Property');
      }
      // if (this.addDelerForm.value.whatsappNo === null || this.addDelerForm.value.whatsappNo === '') {
      //   return this.service.notify.showSuccess('WhatsApp Number is required Property');
      // }
      if (this.addDelerForm.value.password === null || this.addDelerForm.value.password === '') {
        return this.service.notify.showSuccess('Password is required Property');
      }
      if (this.addDelerForm.value.address === null || this.addDelerForm.value.address === '') {
        return this.service.notify.showSuccess('Address is required Property');
      }
      if (this.addDelerForm.value.dealerId === null || this.addDelerForm.value.dealerId === '') {
        return this.service.notify.showSuccess('Delear Id is required Property');
      }
      // if (this.addDelerForm.value.siteWeb === null || this.addDelerForm.value.siteWeb === '') {
      //   return this.service.notify.showSuccess('Site Web is required Property');
      // }
      if (this.addDelerForm.value.mobileNo.length !== 10) {
        return this.service.notify.showSuccess('Mobile Number not Valid!!!');
      }
      if (this.addDelerForm.value.password !== this.addDelerForm.value.cPassword) {
        return this.service.notify.showSuccess('Password and Confirm Password not Match!!!');
      }
    }
  }

  editDeler() {
    if (this.editDelerForm.valid) {
      this.isLoading = true;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `${token}`);

      if (this.editDelerForm.value.whatsAppNumber && !this.editDelerForm.value.countryCodeForWP) {
        this.isLoading = false;
        return this.service.notify.showSuccess('Country Code For Whatsapp Number is required Property');
      }

      if (!this.editDelerForm.value.whatsAppNumber && this.editDelerForm.value.countryCodeForWP) {
        this.isLoading = false;
        return this.service.notify.showSuccess(`Whatsapp Number is required Property`);
      }

      console.log('Form submitted:', this.editDelerForm.value);
      let data = {
        userId: parseInt(this.delerId),
        dealerNumber: this.editDelerForm.value.dealerNumber?.toString() || null,
        firstName: this.editDelerForm.value.firstName?.toString() || null,
        middleName: this.editDelerForm.value.middleName?.toString() || null,
        lastName: this.editDelerForm.value.lastName?.toString() || null,
        displayName: this.editDelerForm.value.displayName?.toString() || null,
        whatsAppNumber: `${this.editDelerForm.value.countryCodeForWP?.toString()}-${this.editDelerForm.value.whatsAppNumber?.toString()}` || null,
        emailId: this.editDelerForm.value.emailId?.toString() || null,
        address: this.address || null,
        busName: this.editDelerForm.value.BussinessName?.toString() || null,
        busLicNumber: this.editDelerForm.value.busLicNumber?.toString() || null,
        ifuNumber: this.editDelerForm.value.ifuNumber?.toString() || null,
        profilePhoto: this.imageName || this.editDelerForm.value.ProfilePhoto || null,
        cityName: this.editDelerForm.value.city || this.city,
        countryId: parseInt(this.editDelerForm.value.country) || this.countryId,
        countryCode: this.countryCode,
        latitude: this.latitude?.toString(),
        longitude: this.longitude?.toString(),
        isActive: 1
      }
      console.log(data);
      this.service.editDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
        if (data.status === 200) {
          this.error = false;
          this.isLoading = false;
          if (this.RoleId === '10') {
            this.router.navigate(['/dashboard']);
            this.service.notify.showError('Importer Updated Successfully');
          } else {
            this.router.navigate(['/deler']);
            this.service.notify.showError('Importer Updated Successfully');
          }
          if (data.status !== 200) {
            this.isLoading = false;
            this.error = true;
          }
        }
      }, (error: any) => {
        console.error('API error:', error);
        this.isLoading = false;
        // this.errmsg = error.error.message;
        this.error = true;
      });
    } else {
      console.log(this.editDelerForm.value);
      // if (this.editDelerForm.value.BussinessName === null || this.editDelerForm.value.BussinessName === '') {
      //   return this.service.notify.showSuccess('Business Name is required Property');
      // }
      // if (this.editDelerForm.value.businessLicense === null || this.editDelerForm.value.businessLicense === '') {
      //   return this.service.notify.showSuccess('Business License is required Property');
      // }
      if (this.editDelerForm.value.ifuNumber === null || this.editDelerForm.value.ifuNumber === '') {
        return this.service.notify.showSuccess('IFU Number is required Property');
      }
      // if (this.editDelerForm.value.firstName === null || this.editDelerForm.value.firstName === '') {
      //   return this.service.notify.showSuccess('First Name is required Property');
      // }
      // if (this.editDelerForm.value.middleName === null || this.editDelerForm.value.middleName === '') {
      //   return this.service.notify.showSuccess('Middle Name is required Property');
      // }
      // if (this.editDelerForm.value.lastName === null || this.editDelerForm.value.lastName === '') {
      //   return this.service.notify.showSuccess('Last Name is required Property');
      // }
      // if (this.editDelerForm.value.emailId === null || this.editDelerForm.value.emailId === '') {
      //   return this.service.notify.showSuccess('Email Id is required Property');
      // }
      // if (this.editDelerForm.value.whatsAppNumber === null || this.editDelerForm.value.whatsAppNumber === '') {
      //   return this.service.notify.showSuccess('WhatsApp Number is required Property');
      // }
      if (this.editDelerForm.value.address === null || this.editDelerForm.value.address === '') {
        return this.service.notify.showSuccess('Address is required Property');
      }
      // if (this.editDelerForm.value.city === null || this.editDelerForm.value.city === '') {
      //   return this.service.notify.showSuccess('City is required Property');
      // }
      // if (this.editDelerForm.value.country === null || this.editDelerForm.value.country === '') {
      //   return this.service.notify.showSuccess('Country is required Property');
      // }
      if (this.editDelerForm.value.dealerNumber === null || this.editDelerForm.value.dealerNumber === '') {
        return this.service.notify.showSuccess('Importer Number is required Property');
      }
    }
  }

  back() {
    this.router.navigate(['/deler']);
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

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    console.log(files);
    for (const droppedFile of files) {

      if (droppedFile.fileEntry.isFile) {
        this.isLoading = true;
        if (this.images.length >= this.maxUploads) {
          this.isLoading = false;
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
              this.imageNameArray.push({
                //  type: 'I',
                //  VehTypeId: 0,
                url: this.imageName,
                thumb: this.imageName,
                //  isMain: 0
              });
              this.imagePath = this.FullUrlForUserImageShow + this.imageName;
              console.log("this is a upload image response", this.imageNameArray);
              console.log("Image Path --", this.imagePath);
              this.isLoading = false;
            }, (error: any) => {
              this.isLoading = false;
              console.error('Error uploading image', error);
            });
          }
          else {
            console.error('Unsupported file type');
          }
          //   console.log("Image/Video Array --", this.imageVideoShow);
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


}

function getComponent(components: Components, name: string) {
  return components?.filter((component) => component.types[0] === name)[0];
}

function getLong(components: Components, name: string) {
  const component = getComponent(components, name);
  return component && component.long_name;
}

function getShort(components: Components, name: string) {
  const component = getComponent(components, name);
  return component && component.short_name;
}

function toEllipse({ north, south, east, west }: cosmos.LatLngBoundsLiteral) {
  const latitude = (north + south) / 2;
  const longitude = (east + west) / 2;
  const r1 =
    geolib.getDistance(
      { latitude: north, longitude },
      { latitude: south, longitude }
    ) / 2;
  const r2 =
    geolib.getDistance(
      { latitude, longitude: west },
      { latitude, longitude: east }
    ) / 2;

  const center = { latitude, longitude };
  const latitudeConv =
    geolib.getDistance(center, { latitude: latitude + 0.1, longitude }) * 10;
  const longitudeCong =
    geolib.getDistance(center, { latitude, longitude: longitude + 0.1 }) * 10;

  const points: cosmos.Coordinates[] = [];
  const FULL = Math.PI * 2;
  for (let i = 0; i <= FULL + 0.0001; i += FULL / 8) {
    points.push({
      latitude: latitude + (r1 * Math.cos(i)) / latitudeConv,
      longitude: longitude + (r2 * Math.sin(i)) / longitudeCong,
    });
  }
  return points;
}

function expandBounds(bounds: cosmos.LatLngBoundsLiteral, meters: number) {
  const SQRT_2 = 1.4142135623730951;
  const { longitude: west, latitude: north } = geolib.computeDestinationPoint(
    {
      latitude: bounds.north,
      longitude: bounds.west,
    },
    SQRT_2 * meters,
    315
  );
  const { longitude: east, latitude: south } = geolib.computeDestinationPoint(
    {
      latitude: bounds.south,
      longitude: bounds.east,
    },
    SQRT_2 * meters,
    135
  );
  return { west, north, east, south };
}

namespace cosmos {
  export interface Coordinates {
    /**
     * Coordinates latitude.
     * @type {number}
     */
    latitude: number;
    /**
     * Coordinates longitude.
     * @type {number}
     */
    longitude: number;
  }
  export interface LatLngBoundsLiteral {
    /**
     * LatLngBoundsLiteral east.
     * @type {number}
     */
    east: number;
    /**
     * LatLngBoundsLiteral north.
     * @type {number}
     */
    north: number;
    /**
     * LatLngBoundsLiteral south.
     * @type {number}
     */
    south: number;
    /**
     * LatLngBoundsLiteral west.
     * @type {number}
     */
    west: number;
  }
}
