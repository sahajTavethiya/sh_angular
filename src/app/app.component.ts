import { Component } from '@angular/core';
import { AuthService } from 'src/app/library/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Elev9App';
  userName = '';
  isitHomepage = true
  constructor(readonly authService: AuthService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const json = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    this.router.events.subscribe((event: any) => {
      if (event.constructor.name === "NavigationEnd") {
        if(this.router.url == '/'){
          this.isitHomepage = true
        }else{
          this.isitHomepage = false
        }
        console.log('Current route:', this.router.url);
        // Do something with the current route
      }
    });
    if (this.authService.currentUserValue && this.authService.currentUserValue.id) {
      this.userName = this.authService.currentUserValue.firstName;
    } else {
      this.userName = '';
    }
  }
}
