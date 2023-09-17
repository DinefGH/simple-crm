import {Component, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent {

  hide = true;
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private afAuth: AngularFireAuth,
    private cdr: ChangeDetectorRef,
  ) { 
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public getErrorMessage() {
    const emailControl = this.form.get('email');
  
    if (emailControl) {
      if (emailControl.hasError('required')) {
        return 'Email is required';
      }
      if (emailControl.hasError('email')) {
        return 'Not a valid email';
      }
    }
    return '';
  }


  recover() {
    const email = this.form.get('email')?.value;
    this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent.
        this.router.navigate(['/sign-in']);
      })
      .catch((error) => {
        // Here you could update a UI element to display the error to the user
        console.error(error);
      });
  }

  backRecover() {
    this.router.navigate(['sign-in']);
  }
}

