import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = { email: null, password: null };
  //validPassword: boolean = true;
  //validEmail: boolean = true;
  loginError: boolean = false;
  //emailErrorMessage = 'Please provide an email with a correct format (ex: me@example.com)';
  //passwordErrorMessage;
  loginErrorMessage;

  constructor(private _auth: AuthenticationService, private _router: Router) { }

  ngOnInit() {
  }

  // onEmailChange(newValue) {
  //   this.validateEmail();
  // }

  // validateEmail() {
  //   let value = this.loginUserData.email;
  //   const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if (validEmailRegEx.test(value)) {
  //     this.validEmail = true;
  //   } else {
  //     this.validEmail = false;
  //   }
  // }


  loginUser() {
    //this.validateEmail();

    //if (this.validEmail) {
      this._auth.loginUser(this.loginUserData)
        .subscribe(
          res => {
            console.log(res);
            localStorage.setItem('token', res.token);
            this._router.navigate(['/home']);
          },
          err => {
            console.log(err);
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                if (err.error.message.toLowerCase() === 'invalid email') {
                  this.loginError = true;
                  this.loginErrorMessage = 'We don\'t recognize the email you entered';
                }
                if (err.error.message.toLowerCase() === 'invalid password') {
                  this.loginError = true;
                  this.loginErrorMessage = 'The password you entered does not match your email';
                }
              }
            }
          }
        );
    //}


  }

}
