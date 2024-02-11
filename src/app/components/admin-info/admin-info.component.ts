import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { LoginService } from '../../service/login.service';
import { MenuComponent } from '../header/menu/menu.component';
import { NavComponent } from '../header/nav/nav.component';
import { ApiService, Maps } from '../../service/GooglePlace/api.service';

const place = null as unknown as google.maps.places.PlaceResult;
type Components = typeof place.address_components;
@Component({
  selector: 'app-admin-info',
  standalone: true,
  providers: [ApiService],
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MenuComponent, NavComponent],
  templateUrl: './admin-info.component.html',
  styleUrl: './admin-info.component.css'
})
export class AdminInfoComponent implements OnInit {

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  @ViewChild('map')
  public mapElementRef!: ElementRef;

  public entries: any = [];

  public place: google.maps.places.PlaceResult | undefined;

  addAdminInfoForm: FormGroup;
  constructor(public service: LoginService, public router: Router, private formBuilder: FormBuilder, public apiService: ApiService) {
    this.addAdminInfoForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  canView = false;
  canUpdate = false;
  isLoading = false;
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    this.service.getloggdUserPermission({ headers }).subscribe((response: any) => {
      console.log(response.data.detail);

      let AdminInfoPagePermission = response.data.detail.find((x: any) => x.ResourceId == 120);
      console.log("its AdminInfoPagePermission", AdminInfoPagePermission);
      if (AdminInfoPagePermission && AdminInfoPagePermission?.CanView && AdminInfoPagePermission?.CanView == true) {
        this.canView = true;
      }
      if (AdminInfoPagePermission && AdminInfoPagePermission?.CanUpdate && AdminInfoPagePermission?.CanUpdate == true) {
        this.canUpdate = true;
      }
      this.isLoading = false;
    }, (error) => {
      console.error(error);
      this.isLoading = false;
    })
    this.getAdminInfo();
  }

  adminInfoData: any = [];
  getAdminInfo() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    this.isLoading = true;
    this.service.getAdminInfo({ headers }).pipe(first()).subscribe((response: any) => {
      console.log(response);
      this.isLoading = false;
      this.adminInfoData = response.data.userDetail;
      this.adminInfoData = {
        name: this.adminInfoData[0].String1,
        phone: this.adminInfoData[0].String2,
        email: this.adminInfoData[0].String3,
        address: this.adminInfoData[0]?.String4 || ''
      }
      this.addAdminInfoForm.setValue(this.adminInfoData);
    }, (error) => {
      console.error(error);
      this.isLoading = false;
    })
  }

  addAdminInfo() {
    if (this.addAdminInfoForm.valid) {
      this.isLoading = true;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      let data = {
        string1: this.addAdminInfoForm.value.name || null,
        string2: this.addAdminInfoForm.value.phone || null,
        string3: this.addAdminInfoForm.value.email || null,
      }

      this.service.saveAdminInfo(data, { headers }).pipe(first()).subscribe((response: any) => {
        console.log(response);
        this.isLoading = false;
        if (response.status === 200) {
          this.service.notify.showSuccess(response.message);
        }
      }, (error) => {
        console.error(error);
        this.isLoading = false;
      });

    } else {
      console.log(this.addAdminInfoForm.value);

      if (this.addAdminInfoForm.value.name === null || this.addAdminInfoForm.value.name === '') {
        return this.service.notify.showSuccess('Name is required Property');
      }
      if (this.addAdminInfoForm.value.phone === null || this.addAdminInfoForm.value.phone === '') {
        return this.service.notify.showSuccess('Phone Number is required Property');
      }
      if (this.addAdminInfoForm.value.email === null || this.addAdminInfoForm.value.email === '') {
        return this.service.notify.showSuccess('Email is required Property');
      }
      if (this.addAdminInfoForm.value.address === null || this.addAdminInfoForm.value.address === '') {
        return this.service.notify.showSuccess('Address is required Property');
      }
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
    });
  }

  initAutocomplete(maps: Maps) {
    let autocomplete = new maps.places.Autocomplete(
      this.searchElementRef?.nativeElement
    );
    autocomplete.addListener('place_changed', () => {
      var place = autocomplete.getPlace();
      if (place && place.address_components && place.geometry) {
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();

        this.address = place.formatted_address;

        console.log("Address --", this.address);
        console.log("latitude --", this.latitude);
        console.log("longitude --", this.longitude);

      }
    });
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
