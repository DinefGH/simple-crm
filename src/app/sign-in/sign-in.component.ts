import {Component, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})




export class SignInComponent {
  hide = true;
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private afAuth: AngularFireAuth,
  ) { 
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }



  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  public getErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }

  public getPasswordErrorMessage() {
    if (this.password?.hasError('required')) {
      return 'Password is required';
    }
    if (this.password?.hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  }


  login() {
    const email = this.form.value.email;
    const password = this.form.value.password;

    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        // Successfully logged in
        this.router.navigate(['dashboard']);
      })
      .catch((error) => {
        // Handle error
        console.error("Login error", error);
      });
  }
}