import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../menu/header/header.component';
import { MenuComponent } from '../menu/menu.component';
import { HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-dealer-profile',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, CommonModule],
  templateUrl: './dealer-profile.component.html',
  styleUrl: './dealer-profile.component.css'
})
export class DealerProfileComponent implements OnInit {
  constructor(public service: LoginService, public router: Router, private route: ActivatedRoute) { }

  dealerId: any;
  isLoading = false;

  UrlForCarImage = environment.CDN_URL;
  thumb = environment.Thumb;
  other = environment.OtherPhotoVideo;
  FullUrlForUserImageShow: any;
  ngOnInit(): void {
    this.dealerId = localStorage.getItem('DealerId');
    this.FullUrlForUserImageShow = this.UrlForCarImage + this.other + this.thumb;
    this.CarDelerDetail();
  }


  delerDetailById: any;
  DealerActive = true;
  CarDelerDetail() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    let data = {
      // userId: id,
      // take: this.paginateData[1],
      // skip: this.paginateData[0],
    }
    this.service.getDealerById(data, { headers }).pipe(first()).subscribe((data: any) => {
      console.log(data.data);
      this.delerDetailById = [];
      localStorage.setItem('DealerId', data.data[0].Id);
      this.dealerId = localStorage.getItem('DealerId');
      data.data.forEach((element: any) => {
        element.isActive = this.DealerActive;
        if (element?.ProfilePhoto && (element?.ProfilePhoto !== undefined || element?.ProfilePhoto !== null)) {
          console.log("User Image --", element.ProfilePhoto);
          element.url = this.FullUrlForUserImageShow + element.ProfilePhoto;
          const whatsappNumberParts = element?.WhatsAppNumber ? element?.WhatsAppNumber.split('-') : '';
          const countryCodeForWp = whatsappNumberParts[0];
          const phoneNumberForWp = whatsappNumberParts[1];
          element.WhatsAppNumber = phoneNumberForWp || '';
          element.countryCodeForWP = countryCodeForWp || '';
            this.delerDetailById.push(element);
          console.log("Dealer Detail By Id --", this.delerDetailById);
        } else {
          // element.url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
          element.url = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
          const whatsappNumberParts = element?.WhatsAppNumber ? element?.WhatsAppNumber.split('-') : '';
          const countryCodeForWp = whatsappNumberParts[0];
          const phoneNumberForWp = whatsappNumberParts[1];
          element.WhatsAppNumber = phoneNumberForWp || '';
          element.countryCodeForWP = countryCodeForWp || '';
          console.log("Not Image for this User", element);
          this.delerDetailById.push(element);
          
        }
      });
      this.isLoading = false;
    });
  }

  dateConvert(date: any) {
    if (date !== undefined || date !== null) {
      const dateTime = new Date(date);
      const formattedDate = dateTime.toLocaleDateString('en-GB');
      return formattedDate;
    } else {
      return date;
    }
  }

  addDeler(id: any) {
    console.log("clicked");
    let dealerId = parseInt(id);
    this.router.navigate(['/update_dealer'], { queryParams: { delerId: dealerId } });
  }

}
