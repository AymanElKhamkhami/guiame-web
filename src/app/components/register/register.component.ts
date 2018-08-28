import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormService } from '../../services/form.service';
import { Router } from '@angular/router'
import { MatDialogRef } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Register } from '../../models/user/register.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

// function hasPunctuation(punctuation: string, errorType: string) {
//   return function(input: FormControl) {
//     return input.value.indexOf(punctuation) >= 0 ?
//         null :
//         { [errorType]: true };
//   };
// }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public formErrors = {
    name: '',
    surename: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  registerUserData: Register;
  submitError: boolean;
  submitErrorMessage;
  loading: boolean;

  constructor(private _dialogRef: MatDialogRef<RegisterComponent>, private _auth: AuthenticationService,
    private _router: Router, public form: FormBuilder, public formService: FormService) { }

  ngOnInit(): void {
    this.buildForm();
  }


  buildForm() {
    this.registerForm = this.form.group({
      name: ['', [Validators.required, this.formService.forbiddenCharacters]],
      surename: ['', [Validators.required, this.formService.forbiddenCharacters]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.formService.validatePassword]],
    });

    this.registerForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formService.validateForm(this.registerForm, this.formErrors, true)
    });
  }

  registerUser() {
    // this._auth.varifyEmail(this.registerUserData)
    //   .then(res => {
    //     console.log(res);
    //     this.registerError = true;
    //     this.registerErrorMessage = 'Verification email sent!';
    //   },
    //     err => {
    //       console.log(err);
    //       this.registerError = true;
    //       this.registerErrorMessage = 'Error sending verification email';
    //     });

    //this.formService.markFormGroupTouched(this.registerForm);
    this.submitError = false;
    this.loading = true;
    this._auth.registerUser(this.registerUserData)
      .then(res => {
        console.log(res);
        this.loading = false;
        //this._auth.displayName = 'firebase';
        this._dialogRef.close();
        //this._router.navigate(['/']);
      },
        err => {
          console.log(err);
          this.loading = false;
          this.submitError = true;
          this.submitErrorMessage = err.message;
        });
  }



  //local registration
  // registerUser() {
  //   this._auth.registerUser(this.registerUserData)
  //   .subscribe(
  //     res => {
  //       this.loading = false;
  //       this._auth.name = res.userData.name;
  //       localStorage.setItem('token', res.token)
  //       this._router.navigate(['/home'])
  //     },
  //     err => {
  //           console.log(err);
  //           this.loading = false;
  //           if (err instanceof HttpErrorResponse) {
  //             if (err.status === 403) {
  //               if (err.error.message.toLowerCase() === 'existing email') {
  //                 this.registerError = true;
  //                 this.registerErrorMessage = 'The email you used is already registered';
  //               }

  //             }
  //             else {
  //               this.registerError = true;
  //               this.registerErrorMessage = 'Something failed :/ Please try again';
  //             }
  //           }
  //         }
  //   )      
  // }


}