import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fournt-page',
  templateUrl: './fournt-page.component.html',
  styleUrls: ['./fournt-page.component.scss']
})
export class FourntPageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  loginPage(){
    this.router.navigateByUrl('/login');
  }

}
