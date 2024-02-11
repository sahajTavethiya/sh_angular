import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../header/menu/menu.component';
import { NavComponent } from '../header/nav/nav.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LazyLoadEvent } from 'primeng/api';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { first } from 'rxjs';
import { ConfirmationDialogComponentComponent } from '../ConfirmationDialogComponent/confirmation-dialog-component/confirmation-dialog-component.component';

@Component({
  selector: 'app-ocr-list',
  standalone: true,
  imports: [MenuComponent, NavComponent, CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, PaginatorModule, MatSlideToggleModule, FormsModule, MatInputModule, ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, MatSelectModule, NgbModalModule, MultiSelectModule, DropdownModule],
  templateUrl: './ocr-list.component.html',
  styleUrl: './ocr-list.component.css'
})
export class OcrListComponent implements OnInit {

  constructor(public service: LoginService, readonly router: Router, private formBuilder: FormBuilder, private modalService: NgbModal, public dialog: MatDialog) {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.allOCRData);
    }, 800);
  }

  displayedColumns: string[] = ['name', 'vin', 'createdOn', 'action'];
  dataSource!: MatTableDataSource<any>;
  allOCRData: any = [];
  isLoading = false;
  showErrorMessage = false;
  paginateData: Array<any> = [0, 10];
  paginateDataedit: Array<any> = [0, 10];
  totalCount = 0;

  ngOnInit(): void {
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }
    this.isLoading = true;
    this.getAllOCR();
  }

  getAllOCR() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    let data = {
      take: this.paginateData[1],
      skip: this.paginateData[0],
      filterString: this.filterString ? this.filterString : ''
    }
    this.service.getAllOCR(data, { headers }).pipe(first()).subscribe((data: any) => {
      console.log(data.data);
      // this.paginateData[0] = 0;
      this.isLoading = false;
      this.allOCRData = data.data.vinList;
      if (this.allOCRData.length === 0) {
        this.showErrorMessage = true;
        this.dataSource = new MatTableDataSource(this.allOCRData);
      } else {
        this.totalCount = data.data.rowCount;
        this.dataSource = new MatTableDataSource(this.allOCRData);
        console.log("-----------", this.allOCRData);
      }
    }, (error) => {
      console.error(error);
      this.isLoading = false;
    });
  }

  deleteVinNumber(vinNumber: any, deleteOrWrong: any) {
    let dialogRef;
    if (deleteOrWrong === 1) {
      dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
        width: '400px',
        data: {
          header: "Confirmation",
          message: "Do you want to Delete ?"
        }
      });
    } else {
      dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
        width: '400px',
        data: {
          header: "Confirmation",
          message: "Are you sure this is Invalid VIN ?"
        }
      });
    }
    dialogRef?.afterClosed().subscribe((result: any) => {
      if (result) {
        this.isLoading = true;
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        let data;
        if (deleteOrWrong === 1) {
          data = {
            vinNum: vinNumber,
            deleted: 1
          }
        } else {
          data = {
            vinNum: vinNumber,
            status: 2
          }
        }
        this.service.updateOCRStatus(data, { headers }).pipe(first()).subscribe((response: any) => {
          console.log(response);
          this.isLoading = false;
          if (response.status === 200) {
            this.service.notify.showSuccess(response.data.msg);
          }
          this.getAllOCR();
        }, (error) => {
          console.error(error);
          this.isLoading = false;
        });
      }
    });
  }

  filterString = '450?0';
  vinSearch(event: any) {
    this.isLoading = true;
    console.log(event.target.value);
    this.filterString = event.target.value;
    this.getAllOCR();
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

  currentPage: number = 0;
  paginate(event: LazyLoadEvent): void {
    this.paginateData[0] = event.first;
    this.paginateData[1] = event.rows;
    this.paginateDataedit[0] = event.first;
    this.paginateDataedit[1] = event.rows;
    if (event.first !== undefined && event.rows !== undefined) {
      this.currentPage = event.first / event.rows * 10;
    }
    this.getAllOCR();
  }

}
