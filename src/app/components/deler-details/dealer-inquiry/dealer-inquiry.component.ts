import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../service/login.service';
import { HttpHeaders } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PaginatorModule } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-dealer-inquiry',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, PaginatorModule],
  templateUrl: './dealer-inquiry.component.html',
  styleUrl: './dealer-inquiry.component.css'
})
export class DealerInquiryComponent implements OnInit {

  constructor(public service: LoginService, readonly router: Router, private route: ActivatedRoute) {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.getAllDealerInquiryData);
    }, 800);
  }

  displayedColumns: string[] = ['VehicalName', 'VehicalModel', 'BodyTypeName', 'ManYear', 'VINNumber', 'CustomerName', 'CustomerNumber', 'dateTime', 'action'];
  dataSource!: MatTableDataSource<any>;

  dealerId: any;
  isLoading = false;
  UrlForCarImage = environment.CDN_URL;
  thumb = environment.Thumb;
  carPhoto = environment.CarPhoto;
  FullUrlForCarImageShow: any;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.dealerId = params['delerId'];
    });

    this.FullUrlForCarImageShow = this.UrlForCarImage + this.carPhoto + this.thumb;
    this.isLoading = true;
    this.dealerInquiry();
  }

  getAllDealerInquiryData: any = [];
  inquiryListNullError = false;
  dealerInquiry() {
    // this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    let data = {
      dealerId: parseInt(this.dealerId),
      take: this.paginateData[1],
      skip: this.paginateData[0],
    }

    this.service.getDealerInquiry(data, { headers }).subscribe((response: any) => {
      console.log("Get all Dealer Inquiries --", response.data);
      this.getAllDealerInquiryData = response.data.userDetail;
      if(this.getAllDealerInquiryData.length === 0){
        this.inquiryListNullError = true;
      } else {
        this.getAllDealerInquiryData.forEach((element: any) => {
          if(element?.Image_Thumb && (element?.Image_Thumb !== undefined || element?.Image_Thumb !== null)) {
            element.url = this.FullUrlForCarImageShow + element.Image_Thumb;
            this.dataSource = this.getAllDealerInquiryData;
          } else {
            element.url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
            this.dataSource = this.getAllDealerInquiryData;
          }
        })
      }
      this.totalCount = response.data.rowCount;
      this.isLoading = false;
    });
  }

  customerDetail(userId: any) {
    this.router.navigate(['/customer_profile'], { queryParams: { delerId: userId } });
  }

  paginateData: Array<any> = [0, 10];
  paginateDataedit: Array<any> = [0, 10];
  totalCount: any;
  currentPage: number = 0;
  paginate(event: LazyLoadEvent) {
    this.paginateData[0] = event.first;
    this.paginateData[1] = event.rows;
    this.paginateDataedit[0] = event.first;
    this.paginateDataedit[1] = event.rows;
    this.dealerInquiry();
    if (event.first !== undefined && event.rows !== undefined) {
      this.currentPage = event.first / event.rows * 10;
    }
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

}
