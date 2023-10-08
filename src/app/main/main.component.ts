import { Component, OnInit, OnDestroy } from '@angular/core'; // <-- Added OnDestroy
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationEnd } from '@angular/router';

type MatDrawerMode = 'over' | 'push' | 'side';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
 

  export class MainComponent implements OnInit, OnDestroy { // <-- Added OnDestroy
    title = 'simple-crm';
    private authSubscription!: Subscription;
    isAuthenticated: boolean = false;
    opened: boolean = true

    @ViewChild('drawer') drawer!: MatDrawer;

    mode: MatDrawerMode = 'side';
    position = 'start';
  
    @HostListener('window:resize', ['$event'])
onResize(event: Event) {
  this.setDrawerProperties(window.innerWidth);
}

    constructor(public dialog: MatDialog, private router: Router, private authService: AuthenticationService) {}
  
    ngOnInit() {
      this.authSubscription = this.authService.isAuthenticated.subscribe(
        (isAuthenticated: boolean) => {
          
          this.isAuthenticated = isAuthenticated; // Update the isAuthenticated property
          if (!isAuthenticated) {
            // Redirect the user to the login page or handle unauthenticated state
          }
        }
      );
      this.setDrawerProperties(window.innerWidth);

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd && this.mode === 'over') {
          this.drawer.close();
        }
      });
    }
  
    ngOnDestroy() {
      this.authSubscription.unsubscribe();
    }

    logout() {
      this.authService.logout().then(() => {
        this.router.navigate(['/sign-in']); 
      });
    }

    setDrawerProperties(width: number) {
      if (width < 1048) {
        this.mode = 'over';
        this.position = 'bottom';
        this.opened = false;
      } else {
        this.mode = 'side';
        this.position = 'start';
        this.opened = true;
      }
    }
  }