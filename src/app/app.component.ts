import { Component, OnInit, OnDestroy } from '@angular/core'; // <-- Added OnDestroy
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy { // <-- Added OnDestroy
  title = 'simple-crm';
  private authSubscription!: Subscription;
  isAuthenticated: boolean = false;

  constructor(public dialog: MatDialog, private authService: AuthenticationService) {}

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
}
