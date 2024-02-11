import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { first } from 'rxjs/internal/operators/first';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { MatSelectModule } from '@angular/material/select';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, DropdownModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginName: any;
  currentUrl: any;
  // , private http: HttpClient
  constructor(public service: LoginService, public router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      mobileNo: ['', Validators.required],
      countryCode: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  countryCodes: any = [];
  getCountryCode: any;
  ngOnInit(): void {
    if (localStorage.getItem('token') !== undefined || localStorage.getItem('token') !== null) {
      this.router.navigate(['/']);
    }

    this.getCountryCode = sessionStorage.getItem('countryCode');
    console.log("Country Code --", this.getCountryCode);


    this.service.getCountriesCode().pipe(first()).subscribe((response: any) => {
      this.countryCodes = response;
      if (this.getCountryCode) {
        this.loginForm.get('countryCode')?.setValue(this.getCountryCode);
      }
    });

    this.currentUrl = window.location.href;

    console.log(this.currentUrl);

    if (this.currentUrl.includes("admin.africaautoconnect.com")) {
      console.log("admin");

      this.loginName = 'Admin';
    } else if (this.currentUrl.includes("dealer.africaautoconnect.com")) {
      this.loginName = 'Importer';

    } else {
      console.log("none");

      this.loginName = 'Admin | Importer';
    }

    this.service.getCountriesCode().pipe(first()).subscribe((response: any) => {
      console.log(response);
    });
  }
  data1: any;
  error = false;
  errmsg: any;

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      let data;
      if (this.currentUrl.includes("dealer.africaautoconnect.com")) {
        // data.roleType = environment.delerRoleTypeId;
        data = {
          mobileNo: this.loginForm.value.mobileNo.toString(),
          password: this.loginForm.value.password,
          countryCode: this.loginForm.value.countryCode,
          roleType: environment.delerRoleTypeId
        }
      } else {
        data = {
          mobileNo: this.loginForm.value.mobileNo.toString(),
          password: this.loginForm.value.password,
          countryCode: this.loginForm.value.countryCode
          // roleType: 0
        }
      }
      this.service.login(data).pipe(first()).subscribe((data: any) => {
        console.log(data);
        // if (data) {
        //   this.data1 = data;
        //   console.log(this.data1);
        //   console.log(this.data1.status);
        // }
        if (data.status === 200) {
          this.error = false;
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("RoleId", data.data.RoleId);
          localStorage.setItem("Name", data.data.Name);
          localStorage.setItem("profilePhoto", data.data.ProfilePhoto);
          sessionStorage.setItem('countryCode', this.loginForm.value.countryCode);
          //bydpatel
          if ((data.data.RoleId !== environment.adminRoleTypeId || data.data.RoleId !== environment.delerRoleTypeId) && data.data.token) {
            const token = data.data.token;
            const headers = new HttpHeaders().set('Authorization', `${token}`);
            this.service.getloggdUserPermission({ headers }).subscribe((response: any) => {
              console.log("this is a response", response.data.detail);
            })
          } else {
            console.log("Token Not Provided!!!");
          }
          if (data.data.RoleId == 10) {
            localStorage.setItem("dealer_id", data.data.dealer_id);
            this.router.navigate(['/dealer_dashboard']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }
        else {
          this.error = true;
          return this.service.notify.showError('Mobile Number and Password are Not Matching!!!');
        }
      }, (error: any) => {
        this.errmsg = error.error.message;
        this.error = true;
        return this.service.notify.showError('Mobile Number and Password are not Matching!!!');
      });
    } else {
      console.log("Form is not valid");
      if (this.loginForm.value.countryCode === null || this.loginForm.value.countryCode === '') {
        return this.service.notify.showError('Country Code is required Property');
      }
      if (this.loginForm.value.mobileNo === null || this.loginForm.value.mobileNo === '') {
        return this.service.notify.showError('Mobile Number is required Property');
      }
      if (this.loginForm.value.password === null || this.loginForm.value.password === '') {
        return this.service.notify.showError('Password is required Property');
      }
      if (this.error === true) {
        return this.service.notify.showError('Mobile Number and Password are not Matching!!!');
      }
    }
    // this.router.navigate(['/dashboard']);

  }
}
