import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MenuComponent } from '../../header/menu/menu.component';
import { NavComponent } from '../../header/nav/nav.component';
import { HttpHeaders } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { environment } from '../../../environment/environment';
import { first } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PaginatorModule } from 'primeng/paginator';
import { SingleDealerDetailComponent } from '../single-dealer-detail/single-dealer-detail.component';
import { SingleDealerCarListComponent } from '../single-dealer-car-list/single-dealer-car-list.component';
import { DealerSubscriptionHistoryComponent } from '../dealer-subscription-history/dealer-subscription-history.component';
import { DealerInquiryComponent } from '../dealer-inquiry/dealer-inquiry.component';
// import { ApiService } from '../../../service/GooglePlace/api.service';

@Component({
  selector: 'app-dealer-deatils-by-id',
  standalone: true,
  imports: [MenuComponent, NavComponent, SingleDealerDetailComponent, CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, PaginatorModule, SingleDealerCarListComponent, DealerSubscriptionHistoryComponent, DealerInquiryComponent],
  templateUrl: './dealer-deatils-by-id.component.html',
  styleUrl: './dealer-deatils-by-id.component.css'
})
export class DealerDeatilsByIdComponent implements OnInit {

  // , public apiService: ApiService,
  constructor(public service: LoginService, public router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute, private cdRef: ChangeDetectorRef) { }

  dealerId: any;
  paginateData: Array<any> = [0, 10];
  paginateDataedit: Array<any> = [0, 10];
  totalCount: any;
  allDelerData: any = [];

  displayedColumns: string[] = ['name', 'phone', 'email', 'companyName', 'dealerId', 'address', 'subscription', 'remainingDays', 'subscriptionStatus', 'userAccountStatus', 'accountCreationDate', 'action'];
  dataSource!: MatTableDataSource<any>;
  canViewInventory = false;
  canViewSubscription = false;
  canViewInquiry = false;
  isLoading = false;
  ngOnInit(): void {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    this.service.getloggdUserPermission({ headers }).subscribe((response: any) => {
      let DealerInventoryPagePermission = response.data.detail.find((x: any) => x.ResourceId == 30);
      let DealerSubscriptionPagePermission = response.data.detail.find((x: any) => x.ResourceId == 40);
      let DealerInquiryPagePermission = response.data.detail.find((x: any) => x.ResourceId == 110);

      if (DealerInventoryPagePermission && DealerInventoryPagePermission?.CanView && DealerInventoryPagePermission?.CanView == true) {
        this.canViewInventory = true;
      }
      if (DealerSubscriptionPagePermission && DealerSubscriptionPagePermission?.CanView && DealerSubscriptionPagePermission?.CanView == true) {
        this.canViewSubscription = true;
      }
      if (DealerInquiryPagePermission && DealerInquiryPagePermission?.CanView && DealerInquiryPagePermission?.CanView == true) {
        this.canViewInquiry = true;
      }
      this.isLoading = false;
    })
    this.route.queryParams.subscribe((params: any) => {
      this.dealerId = params['delerId'];
    });
  }

  searchInputForDealer: any = '';
  dealerSearch(event: any) {
    this.isLoading = true;
    this.searchInputForDealer = event.target.value;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    // Role Type Id - Deler - 10 , Customer - 20, Admin - -1
    let data = {
      roleTypeId: environment.delerRoleTypeId,
      take: this.paginateData[1],
      skip: this.paginateData[0],
      mobileNo: this.searchInputForDealer || ''
    }
    this.service.getAllDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
      this.paginateData[0] = 0;

      this.allDelerData = data.data.dataArray;
      this.totalCount = data.data.rowCount;
      this.dataSource = new MatTableDataSource(this.allDelerData);
      this.isLoading = false;
    });
    // this.CarDelerDetail(this.delerId);
  }

  paginate(event: LazyLoadEvent): void {
    this.paginateData[0] = event.first;
    this.paginateData[1] = event.rows;
    this.paginateDataedit[0] = event.first;
    this.paginateDataedit[1] = event.rows;
    this.ngOnInit();
  }

  activeTab: string = 'details';

  showDetailsTab() {
    this.activeTab = 'details';
  }

  showCarInventoryTab() {
    this.activeTab = 'carInventory';
  }

  showSubscriptionHistoryTab() {
    this.activeTab = 'subscriptionHistory';
  }

  showDealerInquiryTab() {
    this.activeTab = 'dealerInquiry';
  }

  backToDelerPage() {
    this.router.navigate(['/deler']);
  }

  CarDelerDetail(id: any) {
    this.router.navigate(['/dealer_details'], { queryParams: { delerId: id } });
  }

  addDeler() {
    this.router.navigate([`/addDeler`], { queryParams: { delerId: this.dealerId } });
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
