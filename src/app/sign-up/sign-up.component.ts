import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  hide = true;
  form: FormGroup;
  hasAcceptedPrivacyPolicy: boolean = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private afAuth: AngularFireAuth
  ) { 
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]], // if you've custom validation for this, add it here
      hasAcceptedPrivacyPolicy: [false, [Validators.requiredTrue]]
    });
  }

  checkPasswords(group: FormGroup) {
    const password = group.controls['password'].value;
    const confirmPassword = group.controls['confirmPassword'].value;
    return password === confirmPassword ? null : { notSame: true };
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


  public getPasswordErrorMessage() {
    const passwordControl = this.form.get('password');
  
    if (passwordControl) {
      if (passwordControl.hasError('required')) {
        return 'Password is required';
      }
      if (passwordControl.hasError('minLength')) {
        return 'Password must be at least 8 characters long';
      }
    }
    return '';
  }


  public getConfirmPasswordErrorMessage() {
    const confirmPasswordControl = this.form.get('confirmPassword');
  
    if (confirmPasswordControl) {
      if (confirmPasswordControl.hasError('required')) {
        return 'Confirm Password is required';
      }
      if (confirmPasswordControl.hasError('notSame')) {
        return 'Passwords do not match';
      }
    }
    return '';
  }


  async signUp() {
    // Debugging statements
    console.log('Form Valid:', this.form.valid);
    console.log('Form Value:', this.form.value);
  
    if (this.form.valid) {
      const { name, email, password } = this.form.value;
  
      try {
        const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
  
        if (credential.user) {
          await credential.user.updateProfile({ displayName: name });
        }
        this.router.navigate(['/sign-in']);
      } catch (error) {
        console.error("Error during sign up:", error);
      }
    } else {
      // If form is invalid, updating its validity state explicitly
      this.form.updateValueAndValidity();  
    }

    
  }
  backSignUp() {
    this.router.navigate(['sign-in']);
  }
}  
