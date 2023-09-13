import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject = new BehaviorSubject<firebase.User | null>(null);
  public user$ = this.userSubject.asObservable();
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.userSubject.next(user);
      this.isAuthenticated.next(!!user);
    });
  }

  checkAuthenticated(): Observable<firebase.User | null> {
    return this.user$;
  }
}
