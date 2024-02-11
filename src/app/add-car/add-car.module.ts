import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { AddCarComponent } from '../components/deler-details/add-car/add-car.component';
import { SearchFilterModule } from '../search-filter/search-filter.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropEntry, NgxFileDropModule, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpHeaders, HttpResponseBase } from '@angular/common/http';
import { first } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { routes } from '../app.routes';
import { provideRouter } from '@angular/router';
import { SearchFilterPipe } from '../service/search.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [],
  imports: [
    MatSelectModule,
    SearchFilterModule,
    CommonModule,
     MatStepperModule, 
     MatInputModule, 
     MatButtonModule, 
     ReactiveFormsModule, 
     NgxFileDropModule,       
     MatDatepickerModule, 
     MatNativeDateModule ,
     MultiSelectModule ,
     FormsModule,
     MatDialogModule,
     MatMenuModule,
    //  BrowserModule,
    //  BrowserAnimationsModule
    ],
    providers :[SearchFilterPipe]
})
export class AddCarModule { }
