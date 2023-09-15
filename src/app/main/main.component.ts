import { Component, OnInit, OnDestroy } from '@angular/core'; // <-- Added OnDestroy
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
 

  export class MainComponent implements OnInit, OnDestroy { // <-- Added OnDestroy
    title = 'simple-crm';
    private authSubscription!: Subscription;
    isAuthenticated: boolean = false;
  
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
    }
  
    ngOnDestroy() {
      this.authSubscription.unsubscribe();
    }

    logout() {
      this.authService.logout().then(() => {
        this.router.navigate(['/sign-in']);  // Navigate back to the login screen
      });
    }
  }