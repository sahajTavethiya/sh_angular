import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Elev9App';
  userName = '';
  isitHomepage = false;
  currentPath: any;
  @ViewChild('snav') snav: MatSidenav;
  constructor(readonly authService: AuthService,private route: ActivatedRoute, private router: Router) { }
  heardershow = true;
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath = this.router.url.split('#')[1] || this.router.url; // Handles URLs with and without #
        console.log("login",this.currentPath); // This will log '/login' for the given URL
      }
      if (this.currentPath === '/login'){
        console.log("BFIUH");
        
        this.heardershow = false;
      }
    }); 
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.router.events.subscribe((event: any) => {
      if(this.router.url == '/' || this.currentPath == '/'){
        this.isitHomepage = true
      }else{
        this.isitHomepage = false
      }
      // if (event.constructor.name === "NavigationEnd") {
       
      //   console.log('Current route:', this.router.url);
      //   // Do something with the current route
      // }
    });
    if (this.authService.currentUserValue && this.authService.currentUserValue.id) {
      this.userName = this.authService.currentUserValue.firstName;
    } else {
      this.userName = '';
    }
    console.log("its home page",this.isitHomepage)
  }
}
