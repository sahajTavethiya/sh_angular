import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PaginatorModule } from 'primeng/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dealer-subscription-history',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, PaginatorModule],
  templateUrl: './dealer-subscription-history.component.html',
  styleUrl: './dealer-subscription-history.component.css'
})
export class DealerSubscriptionHistoryComponent implements OnInit {

  constructor(public service: LoginService, public router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.subscriptionHistoryData);
    }, 800);
  }

  displayedColumns: string[] = ['SubscriptionName', 'SubscriptionDescription', 'SubscribDays', 'StartDate', 'EndDate', 'status'];
  dataSource!: MatTableDataSource<any>;

  dealerId: any;
  isLoading = false;
  ngOnInit(): void {

    this.route.queryParams.subscribe((params: any) => {
      this.dealerId = params['delerId'];
    });

    this.subscriptionHistory();
  }

  paginateData: Array<any> = [0, 10];
  paginateDataedit: Array<any> = [0, 10];
  totalCount: any;
  subscriptionHistoryData: any;
  subscriptionHistory() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    let data = {
      dealerId: this.dealerId,
      take: this.paginateData[1],
      skip: this.paginateData[0]
    }
    this.service.subscriptionHistory(data, { headers }).pipe(first()).subscribe((response: any) => {
      console.log(response);
      this.subscriptionHistoryData = response.data.historyData;
      this.dataSource = this.subscriptionHistoryData;
      this.totalCount = response.data.rowCount;
      this.isLoading = false;
    });
  }

  currentPage: number = 0;
  paginate(event: LazyLoadEvent): void {
    this.paginateData[0] = event.first;
    this.paginateData[1] = event.rows;
    this.paginateDataedit[0] = event.first;
    this.paginateDataedit[1] = event.rows;
    this.subscriptionHistory();
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
