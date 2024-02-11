import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(public service: LoginService, public router: Router, private route: ActivatedRoute) { }

  UrlForCarImage = environment.CDN_URL;
  thumb = environment.Thumb;
  other = environment.OtherPhotoVideo;
  FullUrlForUserImageShow: any;

  ngOnInit(): void {
    this.FullUrlForUserImageShow = this.UrlForCarImage + this.other + this.thumb;
    this.CarDelerDetail();
  }

  isSidebarActive = false;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  delerDetailById: any;
  DealerActive = true;
  CarDelerDetail() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    let data = {}
    this.service.getDealerById(data, { headers }).pipe(first()).subscribe((data: any) => {
      console.log(data.data);
      this.delerDetailById = [];
      localStorage.setItem('DealerId', data.data[0].Id);
      data.data.forEach((element: any) => {
        element.isActive = this.DealerActive;
        if (element?.ProfilePhoto && (element?.ProfilePhoto !== undefined || element?.ProfilePhoto !== null)) {
          console.log("User Image --", element.ProfilePhoto);
          element.url = this.FullUrlForUserImageShow + element.ProfilePhoto;
          // this.service.showImageForProfilePic(element.ProfilePhoto).subscribe((response: any) => {
          //   element.url = response.uri;
          console.log("User Image Response --", element);
          this.delerDetailById.push(element);
          // });
        } else {
          element.url = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
          console.log("Not Image for this User", element);
          this.delerDetailById.push(element);
        }
      });
    });
  }

  dealerProfile() {
    this.router.navigate(['/dealer_profile']);
  }

  logOut() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }
}
