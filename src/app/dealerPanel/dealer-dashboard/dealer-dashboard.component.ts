import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../menu/header/header.component';
import { MenuComponent } from '../menu/menu.component';
import { HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import Chart from 'chart.js/auto';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dealer-dashboard',
  standalone: true,
  providers: [DatePipe],
  imports: [HeaderComponent, MenuComponent, CommonModule, DropdownModule, FormsModule, ReactiveFormsModule, CalendarModule],
  templateUrl: './dealer-dashboard.component.html',
  styleUrl: './dealer-dashboard.component.css'
})
export class DealerDashboardComponent implements OnInit {

  changeChart: FormGroup;

  constructor(public service: LoginService, public router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.changeChart = this.formBuilder.group({
      week: [''],
      day: [''],
      startDate: [''],
      endDate: ['']
    });
  }

  totalCount: any = 0;
  chartDayWise: any = [];
  chartWeekWise: any = [];

  dealerId: any;
  userActive: any;
  PlanActive: any;
  userName: any;
  displayData: any;
  isLoading = false;

  selectedWeekWise: any = '1 Week';
  selectedDayWise: any = 'D';

  ngOnInit(): void {
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }
    this.dealerId = localStorage.getItem('DealerId');

    this.getDashboard();
    this.getDealerById();

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


    // Current Formatted Date
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
        Date: oneWeek,
        endDate: this.currentFormattedDate,
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

  getDashboard() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    this.service.getDashboard({ headers }).subscribe((response: any) => {
      console.log("its Dealer Dashbord", response.data);
      this.displayData = {
        ActiveVehical: response.data.find((x: any) => x?.Type == 'Vehical' && x?.Active_Inactive == "Active")?.Total_Record,
        DeActiveVehical: response.data.find((x: any) => x?.Type == 'Vehical' && x?.Active_Inactive == "Inactive")?.Total_Record,
        DeletedVehical: response.data.find((x: any) => x?.Type == 'Vehical' && x?.Active_Inactive == "Deleted")?.Total_Record,
      }
      console.log("Display Data --", this.displayData);
      this.isLoading = false;
    });
  }

  getDealerById() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    let data = {};
    this.service.getDealerById(data, { headers }).pipe(first()).subscribe((data: any) => {
      console.log("Dealer Data --", data.data[0].IsActive);
      console.log("Dealer Data --", data.data[0].URSA_IsActive);
      localStorage.setItem('DealerId', data.data[0].Id);
      this.userActive = data.data[0].IsActive;
      this.PlanActive = data.data[0].URSA_IsActive;
      this.userName = data.data[0].DisplayName;
      if (this.userActive === false) {
        this.service.notify.showLongSuccess(`Hello ${this.userName}, your account is inactive, contact our customer service team to help reactivate your account`);
      }
      if (this.PlanActive === false) {
        this.service.notify.showLongSuccess(`Hello ${this.userName}, your subscription has expired, therefore your account is inactive, contact our customer service team to help reactivate your subscription`);
      }
      this.isLoading = false;
    });
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
      // this.changeChart.get('week')?.setValue(event.value);
      const year = formattedDate.getFullYear();
      const month = formattedDate.getMonth() + 1;
      const day = formattedDate.getDate();
      this.formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
      console.log(this.formattedDate);
      this.cdr.detectChanges();
    }
  }

  findChartData() {
    this.totalCountForCarChart = [];
    this.startDateForCarChart = [];
    this.totalCountForCarInquiryChart = [];
    this.startDateForCarInquiryChart = [];
    this.getChartData(false);
  }

  public carChart: any;
  public carInquiryChart: any;
  chartData: any = [];
  totalCountForCarChart: any = [];
  totalCountForActiveCarChart: any = [];
  totalCountForInActiveCarChart: any = [];
  totalCountForDeleteCarChart: any = [];
  startDateForCarChart: any = [];
  totalCountForCarInquiryChart: any = [];
  startDateForCarInquiryChart: any = [];
  DealerInventoryCarMessage = false;
  carForInquiryMessage = false;
  formattedDate: any;
  dealerChartElement: any;
  currentFormattedDate: any;
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
      console.log("its Dashbord Chart Data", response.data);
      this.chartData = response.data;

      this.chartData.forEach((element: any) => {
        this.isLoading = false;
        if (element.SubType === 'Car') {
          this.totalCountForCarChart.push({
            TotalCount: element.TotalCount,
            Act_Inact_Del: element.Act_Inact_Del
          });
          this.totalCountForActiveCarChart = this.totalCountForCarChart.filter((item: any) => item.Act_Inact_Del === 'Active');
          this.totalCountForInActiveCarChart = this.totalCountForCarChart.filter((item: any) => item.Act_Inact_Del === 'Inactive');
          this.totalCountForDeleteCarChart = this.totalCountForCarChart.filter((item: any) => item.Act_Inact_Del === 'Deleted');
          this.startDateForCarChart.push( this.datePipe.transform(element.Start_D_W_M_Y, 'MM-dd-yyyy'));
        } else if (element.Type === 'Inquiry') {
          this.totalCountForCarInquiryChart.push(element.TotalCount);
          this.startDateForCarInquiryChart.push( this.datePipe.transform(element.Start_D_W_M_Y, 'MM-dd-yyyy'));
        }
      });

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
            type: 'line',
            data: {
              labels: this.startDateForCarInquiryChart,
              datasets: [{
                label: 'Car Inquiry',
                data: this.totalCountForCarInquiryChart,
                backgroundColor: '#00D25B',
                borderColor: '#00D25B',
                borderWidth: 2,
                fill: false,
                pointRadius: 5,
                pointBackgroundColor: '#00D25B',
              }],
            },
            options: {
              aspectRatio: 2.5
            }
          });
          this.carForInquiryMessage = false;
        } else {
          this.updateCarInquiryChart();
        }
      } if (this.totalCountForCarInquiryChart.length === 0) {
        this.carForInquiryMessage = true;
        console.log('No chart data available.');
      }
    });
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
        type: 'line',
        data: {
          labels: this.startDateForCarInquiryChart,
          datasets: [{
            label: 'Car Inquiry',
            data: this.totalCountForCarInquiryChart,
            backgroundColor: '#00D25B',
            borderColor: '#00D25B',
            borderWidth: 2,
            fill: false,
            pointRadius: 5,
            pointBackgroundColor: '#00D25B',
          }],
        },
        options: {
          aspectRatio: 2.5
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

  activeCarList() {
    this.router.navigate(['active_car_list']);
  }

}
