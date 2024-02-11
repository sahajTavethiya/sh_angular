import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  constructor(public service: LoginService, public router: Router, private route: ActivatedRoute) { }
  ProfilePhoto: any;

  UrlForCarImage = environment.CDN_URL;
  thumb = environment.Thumb;
  other = environment.OtherPhotoVideo;
  FullUrlForUserImageShow: any;

  ngOnInit(): void {
    this.ProfilePhoto = localStorage.getItem('profilePhoto');
    if (this.ProfilePhoto !== null && this.ProfilePhoto !== 'undefined') {
      this.FullUrlForUserImageShow = this.UrlForCarImage + this.other + this.thumb + this.ProfilePhoto;
    } else {
      this.FullUrlForUserImageShow = 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'
    }

  }

  isSidebarActive = false;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  logOut() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }
}
