// // import { Component, OnInit } from '@angular/core';
// // import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// // import { Router } from '@angular/router';
// // import { LoginService } from '../../service/login.service';
// // import { CommonModule } from '@angular/common';
// // import { ReactiveFormsModule } from '@angular/forms';
// // import { QuillModule } from 'ngx-quill';
// // import { HttpHeaders } from '@angular/common/http';
// // import { FormsModule } from '@angular/forms';
// // import { MatInputModule } from '@angular/material/input';
// // import { MatSelectModule } from '@angular/material/select';
// // import { MatFormFieldModule } from '@angular/material/form-field';
// // import { MenuComponent } from '../header/menu/menu.component';
// // import { NavComponent } from '../header/nav/nav.component';

// // @Component({
// //   selector: 'app-privacy-policy',
// //   standalone: true,
// //   imports: [CommonModule, ReactiveFormsModule, QuillModule, FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, MenuComponent, NavComponent],
// //   templateUrl: './privacy-policy.component.html',
// //   styleUrl: './privacy-policy.component.css'
// // })
// // export class PrivacyPolicyComponent implements OnInit {

// //   constructor(public service: LoginService, readonly router: Router, private formBuilder: FormBuilder) {
// //     this.privacyPolicy = this.formBuilder.group({
// //       content: ['', Validators.required],
// //       pageName: ['', Validators.required]
// //     })
// //   }

// //   privacyPolicy: FormGroup;

// //   loggedUserName = localStorage.getItem('Name')?.toString();
// //   isSidebarActive = false;
// //   pageName = [{
// //     id: 1,
// //     label: 'PrivacyPolicy',
// //     name: 'privacy Policy'
// //   },
// //   {
// //     id: 2,
// //     label: 'TermAndCondition',
// //     name: 'Terms condition'
// //   }];
// //   toggleSidebar() {
// //     this.isSidebarActive = !this.isSidebarActive;
// //   }
// //   canUpdatePage = false;
// //   isLoading = false;
// //   ngOnInit(): void {
// //     if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
// //       this.router.navigate(['/login']);
// //     }
// //     const token = localStorage.getItem('token');
// //     const headers = new HttpHeaders().set('Authorization', `${token}`);
// //     // Role Type Id - Deler - 10 , Customer - 20, Admin - -1.
// //     this.isLoading = true;
// //     this.service.getloggdUserPermission({ headers }).subscribe((response: any) => {
// //       let PolicyPagePermission = response.data.detail.find((x: any) => x.ResourceId == 70);
// //       if (PolicyPagePermission && PolicyPagePermission?.CanUpdate && PolicyPagePermission?.CanUpdate == true) {
// //         this.canUpdatePage = true;
// //       }
// //       this.isLoading = false;
// //     }, (error) => {
// //       console.error(error);
// //       this.isLoading = false;
// //     });
// //   }

// //   submitButtonToggle = false;
// //   pageData: any;
// //   pageChange(event: any) {
// //     this.isLoading = true;
// //     const token = localStorage.getItem('token');
// //     const headers = new HttpHeaders().set('Authorization', `${token}`);
// //     this.service.getPage(event, { headers }).subscribe((response: any) => {
// //       this.submitButtonToggle = true;
// //       this.pageData = response.data.pdata;
// //       this.privacyPolicy.patchValue({ content: this.pageData });
// //       this.isLoading = false;
// //     });
// //   }

// //   content = new FormControl();
// //   onSubmit() {
// //     this.isLoading = true;
// //     let data = {
// //       pageData: this.privacyPolicy.value.content,
// //       pageName: this.privacyPolicy.value.pageName
// //     }
// //     const token = localStorage.getItem('token');
// //     const headers = new HttpHeaders().set('Authorization', `${token}`);
// //     this.service.addPage(data, { headers }).subscribe((response: any) => {
// //       console.log("Response --", response);
// //       this.isLoading = false;
// //       if(response.status === 200) {
// //         this.service.notify.showSuccess(response.message);
// //       }
// //     });
// //   }

// //   dashboard() {
// //     this.router.navigate(['/dashboard']);
// //   }

// //   delers() {
// //     this.router.navigate(['/deler']);
// //   }

// //   customerDetail() {
// //     this.router.navigate(['/customer_detail']);
// //   }

// //   plan() {
// //     this.router.navigate(['/subscription']);
// //   }

// //   privacy() {
// //     this.router.navigate(['/privacy_policy']);
// //   }

// //   ads() {
// //     this.router.navigate(['/addAds']);
// //   }

// //   logOut(): void {
// //     this.router.navigate(['/login']);
// //     localStorage.clear();
// //   }

// // }
