import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deler-car-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deler-car-detail.component.html',
  styleUrl: './deler-car-detail.component.css'
})
export class DelerCarDetailComponent implements OnInit {

  constructor(public service: LoginService, public router: Router, private route: ActivatedRoute) { }

  delerId: any;
  vehicalId: any;
  carList: any = [];
  isSidebarActive = false;
  loggedUserName = localStorage.getItem('Name')?.toString();

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
  isLoading = false;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.delerId = params['delerId'];
      this.vehicalId = params['VehicalId'];
    });
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    let CarData = {
      skip: 0,
      take: 10,
      VehicalId: parseInt(this.vehicalId),
      DealerId: parseInt(this.delerId)
    }
    this.service.getAllCar(CarData, { headers }).pipe(first()).subscribe((data: any) => {
      console.log("Get All Car List --", data.data.carList);
      this.carList = data.data.carList;
      data.data.carList.forEach((element: any) => {
        this.CarImageShow(element);
        console.log("qwertyuio", this.carList);

      });
      this.isLoading = false;
    });
  }
  CarImages: any = [];
  CarImageShow(element: any) {
    console.log("Img Name --", element.images);
    this.isLoading = true;
    if (element?.images && (element?.images !== undefined || element?.images !== null)) {
      element.images.forEach((element: any) => {
        this.service.showImage(element.Thumb).subscribe((response: any) => {
          element.url = response.uri;
          console.log("Image Response --", element);
          this.CarImages.push(element);
          this.isLoading = false;
          // this.carList.push(element);
          console.log("Car List Array --", this.carList);

        });
      });

    } else {
      element.url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
      console.log("Not Image", element);
      this.carList.push(element);
    }

  }

  editCarDetails() {
    console.log("Edit Car Details Clicked!!!");
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
