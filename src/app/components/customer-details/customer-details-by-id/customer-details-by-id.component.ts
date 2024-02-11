import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../header/menu/menu.component';
import { NavComponent } from '../../header/nav/nav.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../../../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs';
import { SingleCustomerDetailComponent } from '../single-customer-detail/single-customer-detail.component';

@Component({
  selector: 'app-customer-details-by-id',
  standalone: true,
  imports: [MenuComponent, NavComponent, CommonModule, SingleCustomerDetailComponent],
  templateUrl: './customer-details-by-id.component.html',
  styleUrl: './customer-details-by-id.component.css'
})
export class CustomerDetailsByIdComponent implements OnInit {
  constructor(public service: LoginService, readonly router: Router, public dialog: MatDialog, private route: ActivatedRoute) { }
  
  dealerId: any;

  paginateData: Array<any> = [0, 10];
  paginateDataedit: Array<any> = [0, 10];

  canUpdateUser = false;
  isLoading = false;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.dealerId = params['delerId'];
    });
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    // Role Type Id - Deler - 10 , Customer - 20, Admin - -1.
    this.service.getloggdUserPermission({ headers }).subscribe((response: any) => {
      let CustomerDetailPagePermission =  response.data.detail.find((x:any) => x.ResourceId == 30);
      console.log("its DealerInventoryPagePermission",CustomerDetailPagePermission);
      
      if(CustomerDetailPagePermission && CustomerDetailPagePermission?.CanUpdate && CustomerDetailPagePermission?.CanUpdate == true){
       this.canUpdateUser = true;
      }
      this.isLoading = false;
     }, (error) => {
      console.error(error);
      this.isLoading = false;
    })
    // this.CarDelerDetail(this.dealerId);

  }

  DealerActive = true;
  delerDetailById: any;
  // CarDelerDetail(id: any) {
  //   // this.router.navigate(['/customer_profile', { queryParams: { delerId: id } }])
  //   this.isLoading = true;
  //   console.log("Deler Id --", id);
  //   this.dealerId = id;
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders().set('Authorization', `${token}`);
  //   let data = {
  //     userId: parseInt(id),
  //     take: this.paginateData[1],
  //     skip: this.paginateData[0],
  //   }
  //   this.service.getAllDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
  //     console.log(data.data);
  //     // this.delerDetailById = data.data.dataArray;
  //     // console.log("zxcvbnm=---- ", this.delerDetailById);
  //     this.delerDetailById = [];
  //     data.data.dataArray.forEach((element: any) => {
  //       this.DealerActive = element.IsActive;
  //       if (element?.ProfilePhoto && (element?.ProfilePhoto !== undefined || element?.ProfilePhoto !== null)) {
  //         console.log("User Image --", element.ProfilePhoto);

  //         this.service.showImageForProfilePic(element.ProfilePhoto).subscribe((response: any) => {
  //           element.url = response.uri;
  //           console.log("User Image Response --", element);
  //           this.delerDetailById.push(element);
  //         });
  //       } else {
  //         console.log("Not Image for this User", element);
  //         element.url = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
  //         this.delerDetailById.push(element);
  //       }
  //     });
  //     this.isLoading = false;
  //   });
  // }

  activeTab: string = 'details';

  showDetailsTab() {
    this.activeTab = 'details';
  }

  backToDelerPage() {
    this.router.navigate(['/customer_detail']);
  }

}
