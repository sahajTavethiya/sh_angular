import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import Chart from 'chart.js/auto';
import { first } from 'rxjs';
import { LoginService } from '../../service/login.service';
import { environment } from '../../environment/environment';
import { response } from 'express';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LazyLoadEvent } from 'primeng/api';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PaginatorModule } from 'primeng/paginator';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from '../header/menu/menu.component';
import { NavComponent } from '../header/nav/nav.component';
import { CalendarModule } from 'primeng/calendar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  providers: [DatePipe],
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, PaginatorModule, MatSlideToggleModule, FormsModule, MultiSelectModule, DropdownModule, MatAutocompleteModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, NgbModalModule, MenuComponent, NavComponent, CalendarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  changeChart: FormGroup;

  constructor(public service: LoginService, readonly router: Router, private el: ElementRef, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.changeChart = this.formBuilder.group({
      week: [''],
      day: [''],
      startDate: [''],
      endDate: ['']
    });
  }
  isSidebarActive = false;
  RoleId: any;
  isSubscribedToEmailsMessage: string = 'Subscribe to Email Notifications';
  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
  loggedUserName = localStorage.getItem('Name')?.toString();
  displayData: any;

  totalCount: any = 0;
  chartDayWise: any = [];
  chartWeekWise: any = [];
  topDealerList: any = [];
  topVehicalList: any = [];

  UrlForCarImage = environment.CDN_URL;
  thumb = environment.Thumb;
  other = environment.OtherPhotoVideo;
  FullUrlForUserImageShow: any;
  isLoading = false;
  canViewCustomer = false;
  canViewDealer = false;
  ngOnInit(): void {
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    this.service.getloggdUserPermission({ headers }).subscribe((response: any) => {
      let CustomerPagePermission = response.data.detail.find((x: any) => x.ResourceId == 50);
      let DealerPagePermission = response.data.detail.find((x: any) => x.ResourceId == 20);
      if (CustomerPagePermission && CustomerPagePermission?.CanView && CustomerPagePermission?.CanView == true) {
        this.canViewCustomer = true;
      }
      if (DealerPagePermission && DealerPagePermission?.CanView && DealerPagePermission?.CanView == true) {
        this.canViewDealer = true;
      }
      this.isLoading = false;
    }, (error) => {
      console.error(error);
      this.isLoading = false;
    })

    this.isLoading = true;
    this.service.getDashboard({ headers }).subscribe((response: any) => {
      console.log("its Dashbord", response);
      this.displayData = {
        ActiveVehical: response.data.find((x: any) => x?.Type == 'Vehical' && x?.Active_Inactive == "Active")?.Total_Record,
        DeActiveVehical: response.data.find((x: any) => x?.Type == 'Vehical' && x?.Active_Inactive == "Inactive")?.Total_Record,
        DeletedVehical: response.data.find((x: any) => x?.Type == 'Vehical' && x?.Active_Inactive == "Deleted")?.Total_Record,
        ActiveCustomer: response.data.find((x: any) => x?.Type == 'Customer' && x?.Active_Inactive == "Active" && x.SubType == "")?.Total_Record,
        ActiveUnPaidDealer: response.data.find((x: any) => x?.Type == 'Dealer' && x?.Active_Inactive == "Active" && x.SubType == "Unpaid Dealer")?.Total_Record,
        ActivePaidDealer: response.data.find((x: any) => x?.Type == 'Dealer' && x?.Active_Inactive == "Active" && x.SubType == "Paid Dealer")?.Total_Record
      }
      this.isLoading = false;
    }, (error) => {
      console.error(error);
      this.isLoading = false;
    });

    // this.service.getListForDropDown(0, 10, { headers }).subscribe((response: any) => {
    //   this.brandList = response.data.userDetail;
    // });

    this.isLoading = true;
    this.service.getTopDealer({ headers }).subscribe((response: any) => {
      console.log(response);

      this.topDealerList = []; //response.data.dealerData;
      this.topVehicalList = []; //response.data.vehicalData;
      if (response.data.dealerData) {
        response.data.dealerData.forEach((element: any) => {
          if (element?.ProfilePhoto && (element?.ProfilePhoto !== undefined || element?.ProfilePhoto !== null)) {
            element.url = this.FullUrlForUserImageShow + element.ProfilePhoto;
            // this.service.showImageForProfilePic(element.ProfilePhoto).subscribe((response: any) => {
            //   element.url = response.uri;
            console.log("User Image Response --", element);
            this.topDealerList.push(element);
            // });
          } else {
            element.url = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
            console.log("Not Image for this User", element);
            this.topDealerList.push(element);
          }
        });
      }
      if (response.data.vehicalData) {
        response.data.vehicalData.forEach((element: any) => {
          if (element?.ProfilePhoto && (element?.ProfilePhoto !== undefined || element?.ProfilePhoto !== null)) {
            element.url = this.FullUrlForUserImageShow + element.ProfilePhoto;
            // this.service.showImageForProfilePic(element.ProfilePhoto).subscribe((response: any) => {
            //   element.url = response.uri;
            console.log("Car Image Response --", element);
            this.topVehicalList.push(element);
            // });
          } else {
            element.url = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
            console.log("Not Image for this User Car", element);
            this.topVehicalList.push(element);
          }
        });
      }
      this.isLoading = false;
    }, (error) => {
      console.error(error);
      this.isLoading = false;
    });

    if (localStorage.getItem('RoleId') === '10') {
      this.CarDelerDetail(parseInt("" + localStorage.getItem('dealerId')));
    }

    this.FullUrlForUserImageShow = this.UrlForCarImage + this.other + this.thumb;
    this.RoleId = localStorage.getItem('RoleId');

    this.chartDayWise = [
      {
        Id: 'D',
        Name: 'Day'
      },
      {
        Id: 'W',
        Name: 'Week'
      },
      {
        Id: 'M',
        Name: 'Month'
      }
    ]

    const currentDate = new Date();

    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 7);

    // Extract components from the sevenDaysAgo date
    const year = sevenDaysAgo.getFullYear();
    const month = sevenDaysAgo.getMonth() + 1;
    const day = sevenDaysAgo.getDate();
    this.formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    console.log(this.formattedDate);

    const oneWeek = new Date(currentDate);
    oneWeek.setDate(currentDate.getDate() - 7);

    const twoWeek = new Date(currentDate);
    twoWeek.setDate(currentDate.getDate() - 14);

    const thirtyDaysAgo = new Date(currentDate);
    thirtyDaysAgo.setDate(currentDate.getDate() - 30);

    // Current Date
    this.currentFormattedDate = this.datePipe.transform(currentDate, 'MM-dd-yyyy');

    this.chartWeekWise = [
      {
        Id: 1,
        Date: oneWeek,
        endDate: '',
        Name: '1 Week'
      },
      {
        Id: 2,
        Date: twoWeek,
        endDate: '',
        Name: '2 Week'
      },
      {
        Id: 3,
        Date: thirtyDaysAgo,
        endDate: '',
        Name: '30 Days'
      },
      {
        Id: 4,
        Date: thirtyDaysAgo,
        endDate: '',
        Name: 'Custom'
      }
    ]

    let selectedValue = {
      week: this.chartWeekWise[0].Id,
      day: this.chartDayWise[0].Id,
      startDate: '',
      endDate: ''
    }
    this.changeChart.setValue(selectedValue);
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.getChartData(true);

  }

  stringForChart: any = 'D';
  changeDayWise(event: any) {
    console.log(event.value);
    this.stringForChart = event.value;
    console.log(this.stringForChart);
    this.changeChart.get('day')?.setValue(event.value);
    this.cdr.detectChanges();
  }

  dateSelection = false;
  changeWeekWise(event: any) {
    console.log(event.value);
    this.changeChart.get('week')?.setValue(event.value);
    let obj = this.chartWeekWise.find((item: any) => item.Id === event.value);
    const formattedDate = obj.Date;
    if (event.value === 4) {
      this.dateSelection = true;
    }
    else {
      // const year = formattedDate.getFullYear();
      // const month = formattedDate.getMonth() + 1;
      // const day = formattedDate.getDate();
      this.formattedDate = this.datePipe.transform(formattedDate, 'MM-dd-yyyy');
      console.log(this.formattedDate);
      this.cdr.detectChanges();
    }
  }

  findChartData() {
    this.totalCountForDealerChart = [];
    this.startDateForDealerChart = [];
    this.totalCountForCustomerChart = [];
    this.startDateForCustomerChart = [];
    this.totalCountForCarChart = [];
    this.startDateForCarChart = [];
    this.totalCountForCarInquiryChart = [];
    this.startDateForCarInquiryChart = [];
    this.getChartData(false);
  }

  public dealerChart: any;
  public customerChart: any;
  public carChart: any;
  public carInquiryChart: any;
  chartData: any = [];
  totalCountForDealerChart: any = [];
  totalCountForDealerActiveChart: any = [];
  totalCountForDealerInActiveChart: any = [];
  startDateForDealerChart: any = [];
  totalCountForCarChart: any = [];
  totalCountForActiveCarChart: any = [];
  totalCountForInActiveCarChart: any = [];
  totalCountForDeleteCarChart: any = [];
  startDateForCarChart: any = [];
  totalCountForCustomerChart: any = [];
  totalCountForActiveCustomerChart: any = [];
  totalCountForInActiveCustomerChart: any = [];
  startDateForCustomerChart: any = [];
  totalCountForCarInquiryChart: any = [];
  startDateForCarInquiryChart: any = [];
  DealerChartMessage = false;
  CustomerChartMessage = false;
  DealerInventoryCarMessage = false;
  carForInquiryMessage = false;
  formattedDate: any;
  currentFormattedDate: any;
  dealerChartElement: any;
  chartDataObj: any;
  getChartData(isFind: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    if (this.dateSelection === false) {
      this.chartDataObj = {
        fromDate: this.formattedDate,
        toDate: this.currentFormattedDate,
        gType: this.stringForChart
      }
    } else {
      this.chartDataObj.fromDate = this.datePipe.transform(this.changeChart.value.startDate, 'MM-dd-yyyy');
      this.chartDataObj.toDate = this.datePipe.transform(this.changeChart.value.endDate, 'MM-dd-yyyy');
    }
    this.isLoading = true;
    this.service.getChartData(this.chartDataObj, { headers }).subscribe((response: any) => {
      this.chartData = response.data;
      console.log("its Dashbord Chart Data", this.chartData);
      this.isLoading = false;
      this.chartData.forEach((element: any) => {
        if (element.SubType === 'Dealer') {
          this.totalCountForDealerChart.push({
            TotalCount: element.TotalCount,
            Act_Inact_Del: element.Act_Inact_Del
          });
          this.totalCountForDealerActiveChart = this.totalCountForDealerChart.filter((item: any) => item.Act_Inact_Del === 'Active');
          this.totalCountForDealerInActiveChart = this.totalCountForDealerChart.filter((item: any) => item.Act_Inact_Del === 'Inactive');
          this.startDateForDealerChart.push(this.datePipe.transform(element.Start_D_W_M_Y, 'MM-dd-yyyy'));
        } else if (element.SubType === 'Customer') {
          this.totalCountForCustomerChart.push({
            TotalCount: element.TotalCount,
            Act_Inact_Del: element.Act_Inact_Del
          });
          this.totalCountForActiveCustomerChart = this.totalCountForCustomerChart.filter((item: any) => item.Act_Inact_Del === 'Active');
          this.totalCountForInActiveCustomerChart = this.totalCountForCustomerChart.filter((item: any) => item.Act_Inact_Del === 'Inactive');
          this.startDateForCustomerChart.push(this.datePipe.transform(element.Start_D_W_M_Y, 'MM-dd-yyyy'));
        } else if (element.SubType === 'Car') {
          this.totalCountForCarChart.push({
            TotalCount: element.TotalCount,
            Act_Inact_Del: element.Act_Inact_Del
          });
          this.totalCountForActiveCarChart = this.totalCountForCarChart.filter((item: any) => item.Act_Inact_Del === 'Active');
          this.totalCountForInActiveCarChart = this.totalCountForCarChart.filter((item: any) => item.Act_Inact_Del === 'Inactive');
          this.totalCountForDeleteCarChart = this.totalCountForCarChart.filter((item: any) => item.Act_Inact_Del === 'Deleted');
          this.startDateForCarChart.push(this.datePipe.transform(element.Start_D_W_M_Y, 'MM-dd-yyyy'));
        } else if (element.Type === 'Inquiry') {
          this.totalCountForCarInquiryChart.push(element.TotalCount);
          this.startDateForCarInquiryChart.push(this.datePipe.transform(element.Start_D_W_M_Y, 'MM-dd-yyyy'));
        }
      });

      //Dealer Chart
      if (this.totalCountForDealerChart) {
        if (isFind) {
          this.dealerChartElement = document.getElementById("dealerChart");
          if (this.dealerChartElement) {
            this.dealerChart = new Chart("dealerChart", {
              type: 'line',
              data: {
                labels: this.startDateForDealerChart,
                datasets: [
                  {
                    label: 'Active',
                    data: this.totalCountForDealerActiveChart.map((item: any) => item.TotalCount),
                    backgroundColor: '#00D25B',
                    borderColor: '#00D25B',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 5,
                    pointBackgroundColor: '#00D25B',
                  },
                  {
                    label: 'In Active',
                    data: this.totalCountForDealerInActiveChart.map((item: any) => item.TotalCount),
                    backgroundColor: '#FC424A',
                    borderColor: '#FC424A',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 5,
                    pointBackgroundColor: '#FC424A',
                  },
                ],
              },
              options: {
                aspectRatio: 2.5
              }
            });
            this.DealerChartMessage = false;
          } else {
            console.error("Element with ID 'dealerChart' not found.");
          }
        }
        else {
          this.updateDealerChart();
        }


      } if (this.totalCountForDealerChart.length === 0) {
        this.DealerChartMessage = true;
      }

      //Customer Chart
      if (this.totalCountForCustomerChart) {
        if (isFind) {
          const customerChartElement = document.getElementById("customerChart");
          if (customerChartElement) {
            this.customerChart = new Chart("customerChart", {
              type: 'line',
              data: {
                labels: this.startDateForCustomerChart,
                datasets: [
                  {
                    label: 'Active',
                    data: this.totalCountForActiveCustomerChart.map((item: any) => item.TotalCount),
                    backgroundColor: '#00D25B',
                    borderColor: '#00D25B',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 5,
                    pointBackgroundColor: '#00D25B',
                  },
                  {
                    label: 'In Active',
                    data: this.totalCountForInActiveCustomerChart.map((item: any) => item.TotalCount),
                    backgroundColor: '#FC424A',
                    borderColor: '#FC424A',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 5,
                    pointBackgroundColor: '#FC424A',
                  },
                ],
              },
              options: {
                aspectRatio: 2.5
              }
            });
            this.CustomerChartMessage = false;
          } else {
            console.error("Element with ID 'customerChart' not found.");
          }
        } else {
          this.updateCustomerChart();
        }
      } if (this.totalCountForCustomerChart.length === 0) {
        this.CustomerChartMessage = true;
      }

      //Car Chart
      if (this.totalCountForCarChart) {
        if (isFind) {
          const carChartElement = document.getElementById("carChart");
          if (carChartElement) {
            this.carChart = new Chart("carChart", {
              type: 'line',
              data: {
                labels: this.startDateForCarChart,
                datasets: [
                  {
                    label: 'Active',
                    data: this.totalCountForActiveCarChart.map((item: any) => item.TotalCount),
                    backgroundColor: '#00D25B',
                    borderColor: '#00D25B',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 5,
                    pointBackgroundColor: '#00D25B',
                  },
                  {
                    label: 'In Active',
                    data: this.totalCountForInActiveCarChart.map((item: any) => item.TotalCount),
                    backgroundColor: '#FC424A',
                    borderColor: '#FC424A',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 5,
                    pointBackgroundColor: '#FC424A',
                  },
                  {
                    label: 'Deleted',
                    data: this.totalCountForDeleteCarChart.map((item: any) => item.TotalCount),
                    backgroundColor: '#007BFF',
                    borderColor: '#007BFF',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 5,
                    pointBackgroundColor: '#007BFF',
                  },
                ],
              },
              options: {
                aspectRatio: 2.5
              }
            });
            this.DealerInventoryCarMessage = false;
          } else {
            console.error("Element with ID 'carChart' not found.");
          }
        } else {
          this.updateDealerCarChart();
        }
      }
      if (this.totalCountForCarChart.length === 0) {
        this.DealerInventoryCarMessage = true;
      }

      //Car Inquiry Chart
      if (this.totalCountForCarInquiryChart) {
        if (isFind) {
          this.carInquiryChart = new Chart("carInquiryChart", {
            type: 'bar',
            data: {
              labels: this.startDateForCarInquiryChart,
              datasets: [{
                label: 'Car Inquiry ',
                data: this.totalCountForCarInquiryChart,
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Bar color
                borderColor: '#FF6384',
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                // xAxes: [{
                //   barPercentage: 0.4, // Adjust the width of the bars
                // }],
                // yAxes: [{
                //   ticks: {
                //     beginAtZero: true,
                //   },
                //   reverse: false as boolean | undefined // Set reverse property directly in yAxes configuration
                // }]
              },
              // legend: {
              //   display: false // Hide legend if not needed
              // }
            }
          });
          this.carForInquiryMessage = false;
        } else {
          this.updateCarInquiryChart();
        }
      } if (this.totalCountForCarInquiryChart.length === 0) {
        this.carForInquiryMessage = true;
      }
    }, (error) => {
      console.log(error);
      this.isLoading = false;
    });
  }
  updateDealerChart() {
    if (this.dealerChart) {
      this.dealerChart.destroy();
    }
    setTimeout(() => {
      this.dealerChart = new Chart("dealerChart", {
        type: 'line',
        data: {
          labels: this.startDateForDealerChart,
          datasets: [
            {
              label: 'Active',
              data: this.totalCountForDealerActiveChart.map((item: any) => item.TotalCount),
              backgroundColor: '#00D25B',
              borderColor: '#00D25B',
              borderWidth: 2,
              fill: false,
              pointRadius: 5,
              pointBackgroundColor: '#00D25B',
            },
            {
              label: 'In Active',
              data: this.totalCountForDealerInActiveChart.map((item: any) => item.TotalCount),
              backgroundColor: '#FC424A',
              borderColor: '#FC424A',
              borderWidth: 2,
              fill: false,
              pointRadius: 5,
              pointBackgroundColor: '#FC424A',
            },
          ],
        },
        options: {
          aspectRatio: 2.5
        }
      });
    }, 1000);
  }
  updateCustomerChart() {
    if (this.customerChart) {
      this.customerChart.destroy();
    }
    setTimeout(() => {
      this.customerChart = new Chart("customerChart", {
        type: 'line',
        data: {
          labels: this.startDateForCustomerChart,
          datasets: [
            {
              label: 'Active',
              data: this.totalCountForActiveCustomerChart.map((item: any) => item.TotalCount),
              backgroundColor: '#00D25B',
              borderColor: '#00D25B',
              borderWidth: 2,
              fill: false,
              pointRadius: 5,
              pointBackgroundColor: '#00D25B',
            },
            {
              label: 'In Active',
              data: this.totalCountForInActiveCustomerChart.map((item: any) => item.TotalCount),
              backgroundColor: '#FC424A',
              borderColor: '#FC424A',
              borderWidth: 2,
              fill: false,
              pointRadius: 5,
              pointBackgroundColor: '#FC424A',
            },
          ],
        },
        options: {
          aspectRatio: 2.5
        }
      });
    }, 1000);
  }
  updateDealerCarChart() {
    if (this.carChart) {
      this.carChart.destroy();
    }
    setTimeout(() => {
      this.carChart = new Chart("carChart", {
        type: 'line',
        data: {
          labels: this.startDateForCarChart,
          datasets: [
            {
              label: 'Active',
              data: this.totalCountForActiveCarChart.map((item: any) => item.TotalCount),
              backgroundColor: '#00D25B',
              borderColor: '#00D25B',
              borderWidth: 2,
              fill: false,
              pointRadius: 5,
              pointBackgroundColor: '#00D25B',
            },
            {
              label: 'In Active',
              data: this.totalCountForInActiveCarChart.map((item: any) => item.TotalCount),
              backgroundColor: '#FC424A',
              borderColor: '#FC424A',
              borderWidth: 2,
              fill: false,
              pointRadius: 5,
              pointBackgroundColor: '#FC424A',
            },
            {
              label: 'Deleted',
              data: this.totalCountForDeleteCarChart.map((item: any) => item.TotalCount),
              backgroundColor: '#007BFF',
              borderColor: '#007BFF',
              borderWidth: 2,
              fill: false,
              pointRadius: 5,
              pointBackgroundColor: '#007BFF',
            },
          ],
        },
        options: {
          aspectRatio: 2.5
        }
      });
    }, 1000);
  }
  updateCarInquiryChart() {
    if (this.carInquiryChart) {
      this.carInquiryChart.destroy();
    }
    setTimeout(() => {
      this.carInquiryChart = new Chart("carInquiryChart", {
        type: 'bar',
        data: {
          labels: this.startDateForCarInquiryChart,
          datasets: [{
            label: 'Car Inquiry ',
            data: this.totalCountForCarInquiryChart,
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Bar color
            borderColor: '#FF6384',
            borderWidth: 1
          }]
        },
        options: {
          scales: {},
        }
      });
    }, 1000);
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

  paginateData: Array<any> = [0, 10];
  paginateDataedit: Array<any> = [0, 10];

  paginate(event: LazyLoadEvent): void {
    this.paginateData[0] = event.first;
    this.paginateData[1] = event.rows;
    this.paginateDataedit[0] = event.first;
    this.paginateDataedit[1] = event.rows;
    this.ngOnInit();

  }

  sotingData(name: any) {
    if (name != "action") {
      this.paginateData[0] = this.paginateDataedit[0];
      this.paginateData[1] = this.paginateDataedit[1];
      this.ngOnInit();
    }

  }

  DealerDetails(dealerId: any) {
    this.router.navigate(['/dealer_details'], { queryParams: { delerId: dealerId } });
  }

  delerDetailById: any;
  delerId: any;
  dealerId: any;
  carList: any = [];
  CarDelerDetail(id: any) {
    this.isLoading = true;
    console.log("Deler Id --", id);
    this.delerId = id;
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
          // this.service.showImageForProfilePic(element.ProfilePhoto).subscribe((response: any) => {
          //   element.url = response.uri;
          console.log("User Image Response --", element);
          this.delerDetailById.push(element);
          // });
        } else {
          // element.url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
          // element.url = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
          console.log("Not Image for this User", element);
          this.delerDetailById.push(element);
        }
      });
      this.isLoading = false;
    }, (error) => {
      console.error(error);
      this.isLoading = false;
    });

    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization', `${token}`);
    // Role Type Id - Deler - 10 , Customer - 20, Admin - -1
    this.isLoading = true;
    let CarData = {
      take: this.paginateData[1],
      skip: this.paginateData[0],
      VehicalId: 0,
      DealerId: parseInt(this.dealerId)
    }
    this.service.getAllCar(CarData, { headers }).pipe(first()).subscribe((data: any) => {
      console.log("Get All Car List --", data.data.carList);

      this.carList = [] //data.data.carList;
      this.totalCount = data.data.rowCount;
      data.data.carList.forEach((element: any) => {
        this.CarImageShow(element);
      });
      this.isLoading = false;
    }, (error) => {
      console.error(error);
      this.isLoading = false;
    });

    // this.showAllDeler = false;
  }

  CarImageShow(element: any) {
    this.isLoading = true;
    console.log("Img Name --", element.Main_Image_Thumb);
    if (element?.Main_Image_Thumb && (element?.Main_Image_Thumb !== undefined || element?.Main_Image_Thumb !== null)) {
      this.service.showImage(element.Main_Image_Thumb).subscribe((response: any) => {
        element.url = response.uri;
        console.log("Image Response --", element);
        this.carList.push(element);
      }, (error) => {
        console.error(error);
        this.isLoading = false;
      });
    } else {
      element.url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";
      console.log("Not Image", element);
      this.carList.push(element);
    }
    this.isLoading = false;
  }

  CarDetailById(VehicalId: any) {
    console.log("Cliecked", VehicalId, this.dealerId);
    this.router.navigate(['/add_car'], { queryParams: { VehicalId: VehicalId, delerId: parseInt(this.dealerId) } });
    //  this.router.navigate(['/carDetail'], { queryParams: { VehicalId: VehicalId, delerId: parseInt(this.delerId) } });
  }

  addDeler(id: any) {
    console.log("clicked");
    let dealerId = parseInt(id);
    this.router.navigate(['/addDeler'], { queryParams: { delerId: dealerId } });
  }

  filteredCarList: any[] = [];
  searchTerm = '';

  filterCarList() {
    console.log('Search term:', this.searchTerm);
    this.filteredCarList = this.carList.filter((car: any) =>
      car.MakerName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    console.log('Filtered Car List:', this.filteredCarList);
  }



  paginateForCarList(event: LazyLoadEvent): void {
    this.paginateData[0] = event.first;
    this.paginateData[1] = event.rows;
    this.paginateDataedit[0] = event.first;
    this.paginateDataedit[1] = event.rows;
    this.getdealerCarList();
  }

  deleteCar(carId: any) {
    this.isLoading = true;
    let CarId = parseInt(carId);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    let data = {
      vehId: CarId
    }
    this.service.deleteCarById(data, { headers }).subscribe((response: any) => {
      console.log(response);
      this.isLoading = false;
      this.getdealerCarList();
    }, (error) => {
      console.error(error);
      this.isLoading = false;
    });
  }

  getdealerCarList() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    let CarData = {
      take: this.paginateData[1],
      skip: this.paginateData[0],
      // take: 100,
      // skip: 0,
      VehicalId: 0,
      DealerId: parseInt(this.dealerId),
      filterString: ''
    }
    // if (this.filterStringForCar !== '') {
    //   CarData.filterString = `${environment.CarSearchForBrand}?${this.filterStringForCar}`
    // }
    this.service.getAllCar(CarData, { headers }).pipe(first()).subscribe((data: any) => {
      console.log("Get All Car List --", data.data.carList);

      this.carList = [] //data.data.carList;
      data.data.carList.forEach((element: any) => {
        this.CarImageShow(element);
      });
      this.isLoading = false;
    }, (error) => {
      console.error(error);
      this.isLoading = false;
    });
  }

  deleteImage(image: any) {
    console.log(image);

  }


  addCar() {
    // this.router.navigate(['/add_car']);
    window.open(`/add_car?delerId=${this.dealerId}`, '_blank');
  }
  DealerActive: any;
  onToggleChange(item: any): void {
    if (item.isActive === true) {
      this.isLoading = true;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      item.isActive = false;
      let data = {
        userId: parseInt(item.Id),
        firstName: item.DisplayName || null,
        lastName: '' || null,
        middleName: '' || null,
        displayName: item.DisplayName || null,
        emailId: item.EmailId || null,
        address: item.Address || null,
        busName: item.CompanyName || null,
        busLicNumber: item.BusLicNumber || null,
        dealerNumber: item.DealerNumber || null,
        ifuNumber: item.IFUNumber || null,
        whatsAppNumber: item.WhatsAppNumber || null,
        profilePhoto: item.ProfilePhoto || null,
        isActive: 0,
        isDeleted: 0
      };
      console.log("Request Data --", data);

      this.service.editDeler(data, { headers }).pipe(first()).subscribe((data: any) => {
        console.log("-----------", data);
        this.isLoading = false;
        this.CarDelerDetail(parseInt(item.Id));
      }, (error) => {
        console.error(error);
        this.isLoading = false;
      });
      // item.isActive = false;
    } else {
      item.isActive = true;
      this.CarDelerDetail(parseInt(item.Id));
    }

    console.log(item);

    console.log('Toggle state changed:', this.DealerActive);

  }

  dashboard() {
    this.router.navigate(['/dashboard']);
  }

  delers() {
    if (this.canViewDealer === true) {
      if (this.RoleId === environment.delerRoleTypeId.toString()) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/deler']);
      }
    }
  }

  activeCarList() {
    this.router.navigate(['/active_all_car_list']);
  }

  customerDetail() {
    if (this.canViewCustomer === true) {
      this.router.navigate(['/customer_detail']);
    }
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
