import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  constructor(public service: LoginService, public router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  loggedUserName = localStorage.getItem('Name')?.toString();

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

}
