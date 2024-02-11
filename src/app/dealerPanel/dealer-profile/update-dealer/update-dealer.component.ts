import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../menu/header/header.component';
import { MenuComponent } from '../../menu/menu.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Maps } from '../../../service/GooglePlace/api.service';
import { geolib } from '../../../components/deler-details/add-deler/geolib';
import { first } from 'rxjs';
import { NgxFileDropEntry, NgxFileDropModule, FileSystemFileEntry } from 'ngx-file-drop';
import { MatInputModule } from '@angular/material/input';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment/environment';


const place = null as unknown as google.maps.places.PlaceResult;
type Components = typeof place.address_components;

@Component({
  selector: 'app-update-dealer',
  standalone: true,
  providers: [ApiService],
  imports: [ReactiveFormsModule, CommonModule, NgxFileDropModule, MatInputModule, MultiSelectModule, DropdownModule, HeaderComponent, MenuComponent, CommonModule],
  templateUrl: './update-dealer.component.html',
  styleUrl: './update-dealer.component.css'
})
export class UpdateDealerComponent implements OnInit {
  editDelerForm: FormGroup;

  constructor(public service: LoginService, public router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute, public apiService: ApiService, private cdRef: ChangeDetectorRef) {
    apiService.api.then((maps) => {
      this.initAutocomplete(maps);
      //this.initMap(maps);
    });

    this.editDelerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      displayName: [''],
      countryCodeForWP: [''],
      whatsAppNumber: [''],
      emailId: [''],
      address: ['', Validators.required],
      BussinessName: ['', Validators.required],
      busLicNumber: [''],
      ifuNumber: ['', Validators.required],
      dealerNumber: ['', Validators.required],
      country: [''],
      city: ['']
    });
  }

  delerDetailById: any = [];
  dealerId: any;
  imagePath: any = '';
  delerDetailByIdData: any;
  isLoading = false;
  UrlForCarImage = environment.CDN_URL;
  thumb = environment.Thumb;
  other = environment.OtherPhotoVideo;
  FullUrlForUserImageShow: any;
  countryCodes: any = [];
  ngOnInit(): void {
    this.FullUrlForUserImageShow = this.UrlForCarImage + this.other + this.thumb;
    this.route.queryParams.subscribe((params: any) => {
      this.dealerId = params['delerId'];
    });

    this.service.getCountriesCode().pipe(first()).subscribe((response: any) => {
      this.countryCodes = response;
    });

    this.isLoading = true;
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
          // this.service.showImageForProfilePic(element.ProfilePhoto).subscribe((response: any) => {
          this.imagePath = this.FullUrlForUserImageShow + element.ProfilePhoto;
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
            country: parseInt(this.delerDetailByIdData?.CountryId) || '',
            city: this.delerDetailByIdData?.CityName || ''
          }
          const whatsappNumberParts = this.delerDetailByIdData?.WhatsAppNumber ? this.delerDetailByIdData?.WhatsAppNumber.split('-') : '';
          const countryCodeForWp = whatsappNumberParts[0];
          const phoneNumberForWp = whatsappNumberParts[1];
          this.delerDetailById.whatsAppNumber = phoneNumberForWp || '';
          this.delerDetailById.countryCodeForWP = countryCodeForWp || '';
          console.log("--its obj", this.delerDetailById);

          this.editDelerForm.patchValue(this.delerDetailById);
          console.log("Edit Dealer Form --", this.editDelerForm.value);

          this.editDelerForm.value.country = this.countryId;
          console.log(this.countryId);
          this.isLoading = false;
          // });
        } else {
          // element.url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
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
            country: this.delerDetailByIdData?.CountryId || '',
            city: this.delerDetailByIdData?.CityName || ''
          }
          const whatsappNumberParts = this.delerDetailByIdData?.WhatsAppNumber ? this.delerDetailByIdData?.WhatsAppNumber.split('-') : '';
          const countryCodeForWp = whatsappNumberParts[0];
          const phoneNumberForWp = whatsappNumberParts[1];
          this.delerDetailById.whatsAppNumber = phoneNumberForWp || '';
          this.delerDetailById.countryCodeForWP = countryCodeForWp || '';
          this.editDelerForm.patchValue(this.delerDetailById);
          this.editDelerForm.value.country = this.countryId;
          console.log(this.countryId);

        }
      });
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
  }



  public files: NgxFileDropEntry[] = [];
  public maxUploads = 1;
  public flexMaxMessage = false;
  imageNameArray: any[] = [];
  public images: string[] = [];
  imageName: any;

  // File Upload
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
              this.imageName = response.data.filename;
              this.imageNameArray.push({
                //  type: 'I',
                //  VehTypeId: 0,
                url: this.imageName,
                thumb: this.imageName,
                //  isMain: 0
              });
              console.log("this is a upload image response", this.imageNameArray)
              // this.service.getImageForProfilePic(this.imageName).subscribe((response: any) => {
              //   console.log("Image Response --", response);
              //   this.imagePath = response.uri;
              //   console.log("Image Path --", this.imagePath);
              // });
              this.imagePath = this.FullUrlForUserImageShow + this.imageName;
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

  //Update User Profile
  error = false;
  editDeler() {
    if (this.editDelerForm.valid) {

      if (this.editDelerForm.value.whatsAppNumber && !this.editDelerForm.value.countryCodeForWP) {
        this.isLoading = false;
        return this.service.notify.showSuccess('Country Code For Whatsapp Number is required Property');
      }

      if (!this.editDelerForm.value.whatsAppNumber && this.editDelerForm.value.countryCodeForWP) {
        this.isLoading = false;
        return this.service.notify.showSuccess(`Whatsapp Number is required Property`);
      }
      this.isLoading = true;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `${token}`);

      console.log('Form submitted:', this.editDelerForm.value);
      let data = {
        userId: parseInt(this.dealerId),
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
        latitunde: this.latitude ? this.latitude.toString() : '',
        longitude: this.longitude ? this.longitude.toString() : '',
        isActive: 1
      }
      console.log(data);
      this.service.editDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
        if (data.status === 200) {
          this.error = false;
          this.isLoading = false;
          this.router.navigate(['/dealer_profile']);
          this.service.notify.showError('Dealer Updated Successfully');
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
      console.log(this.editDelerForm.value);
      if (this.editDelerForm.value.BussinessName === null || this.editDelerForm.value.BussinessName === '') {
        return this.service.notify.showSuccess('Business Name is required Property');
      }
      if (this.editDelerForm.value.ifuOfCompany === null || this.editDelerForm.value.ifuOfCompany === '') {
        return this.service.notify.showSuccess('IFU Of Company is required Property');
      }
      if (this.editDelerForm.value.firstName === null || this.editDelerForm.value.firstName === '') {
        return this.service.notify.showSuccess('First Name is required Property');
      }
      if (this.editDelerForm.value.lastName === null || this.editDelerForm.value.lastName === '') {
        return this.service.notify.showSuccess('Last Name is required Property');
      }
      if (this.editDelerForm.value.address === null || this.editDelerForm.value.address === '') {
        return this.service.notify.showSuccess('Address is required Property');
      }
      if (this.editDelerForm.value.dealerNumber === null || this.editDelerForm.value.dealerNumber === '') {
        return this.service.notify.showSuccess('Dealer Number is required Property');
      }
    }
  }

  back() {
    this.router.navigate(['/dealer_profile']);
  }


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
  countriesName: any = [];
  countriesData: any = [];


  // For Full address Search Field

  latitude: any;
  longitude: any;
  country: any;
  city: any;
  countryCode: any;
  countryId: any;
  address: any;
  initAutocomplete(maps: Maps) {
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

        let countryIdObj = this.countriesData.find((x: any) => x.CountryName === this.country);

        console.log(countryIdObj);
        this.countryId = countryIdObj.Id;
        this.editDelerForm.get('country')?.patchValue(countryIdObj.Id);
        this.cdRef.detectChanges();



        this.city = this.getAddressComponent(place.address_components, 'locality') || this.getAddressComponent(place.address_components, 'administrative_area_level_1');
        console.log(this.city);
        if (this.city) {
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