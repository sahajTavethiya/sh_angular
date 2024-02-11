import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../service/login.service';
import { HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs/internal/operators/first';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../header/menu/menu.component';
import { NavComponent } from '../../header/nav/nav.component';

@Component({
  selector: 'app-add-subscription',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, MenuComponent, NavComponent],
  templateUrl: './add-subscription.component.html',
  styleUrl: './add-subscription.component.css'
})
export class AddSubscriptionComponent implements OnInit {
  loggedUserName = localStorage.getItem('Name')?.toString();
  addPlanForm: FormGroup;
  isSidebarActive = false;
  readonlysubscription = false;
  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
  constructor(public service: LoginService, readonly router: Router, private formBuilder: FormBuilder,private route:ActivatedRoute) {
    

    this.addPlanForm = this.formBuilder.group({
      subscriptionName: ['', Validators.required],
      subscriptionDescription: ['', Validators.required],
      subscriptionPrice: ['', Validators.required],
      // subscriptionCarValidity: ['', Validators.required],
      subscriptionDays: ['', Validators.required]
    });
  }
  subscriptionId : number = 0;
  isLoading = false;
  ngOnInit(): void {
    this.subscriptionId = this.route.snapshot.params['id'];

    
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }
    if(this.subscriptionId){
      this.readonlysubscription = true;
      this.isLoading = true;
      this.service.getDataFromSubscriptionComp().subscribe((data) => {
        console.log("this is a get data",data);
        let obj = {
          subscriptionName : data.SubscriptionName,
          subscriptionDescription: data.SubscriptionDescription,
          subscriptionPrice : data.Amount,
          subscriptionDays : data.SubscribDays
        }
        this.addPlanForm.setValue(obj);
        this.isLoading = false;
      });
    }
    console.log("this is a subscriptionId",this.subscriptionId);
  }

  error = false;
  addPlan() {
    if (this.addPlanForm.valid) {
      this.isLoading = true;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `${token}`);

      console.log('Form submitted:', this.addPlanForm.value);
      let data = {
        id: this.subscriptionId,
        subscriptionName: this.addPlanForm.value.subscriptionName.toString(),
        subscriptionDescription: this.addPlanForm.value.subscriptionDescription.toString(),
        amount: this.addPlanForm.value.subscriptionPrice,
        // subscriptionCarValidity: this.addPlanForm.value.subscriptionCarValidity.toString(),
        subscribDays: this.addPlanForm.value.subscriptionDays
      }
      console.log(headers);
      this.service.addNewSubscriptionPlan(data, { headers }).pipe(first()).subscribe((response: any) => {
        if (response.status === 200) {
          console.log(response);
          this.isLoading = false;
          this.service.notify.showSuccess(response.data.msg);
          this.router.navigate(['/subscription']);
          this.error = false;
        }
        if (response.status !== 200) {
          this.error = true;
          this.isLoading = false;
        }
      }, (error: any) => {
        console.error('API error:', error);
        this.isLoading = false;
        // this.errmsg = error.error.message;
        this.error = true;
      });
    }
  }

  back() {
    this.router.navigate(['/subscription']);
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

  logOut(): void {
    this.router.navigate(['/login']);
    localStorage.clear();
  }
}
