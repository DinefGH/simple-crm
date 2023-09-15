import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject = new BehaviorSubject<firebase.User | null>(null);
  public user$ = this.userSubject.asObservable();
  public isAuthenticated: BehaviorSubject<boolean>;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    // Initialize from Local Storage
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    this.isAuthenticated = new BehaviorSubject<boolean>(!!storedUser);

    // Listen for future auth changes
    this.afAuth.authState.subscribe(user => {
      this.userSubject.next(user);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.isAuthenticated.next(true);
      } else {
        localStorage.removeItem('user');
        this.isAuthenticated.next(false);
      }
    });
  }

  checkAuthenticated(): Observable<firebase.User | null> {
    return this.user$;
  }

  logout(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.userSubject.next(null);
      this.isAuthenticated.next(false);
    });
  }

  signInAnonymously(): Promise<void> {
    return this.afAuth.signInAnonymously().then((result) => {
      // Handle the result
      const user = result.user;
      this.userSubject.next(user);
      this.isAuthenticated.next(!!user);

      // Navigate to the dashboard
      this.router.navigate(['dashboard']);
    })
    .catch((error) => {
      // Handle errors here
      console.error("Anonymous sign-in failed:", error);
    });
  }
}
