import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterPipe } from '../service/search.pipe';



@NgModule({
  declarations: [SearchFilterPipe],
  exports: [SearchFilterPipe],
  imports: [
    CommonModule
  ]
})
export class SearchFilterModule { }
