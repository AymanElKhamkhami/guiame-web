import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {};
  registerError: boolean;
  registerErrorMessage;
  loading: boolean;

  constructor(private _auth: AuthenticationService,
    private _router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    this.loading = true;
    this._auth.registerUser(this.registerUserData)
      .then(res => {
        console.log(res);
        this.loading = false;
        this._auth.displayName = 'firebase';
        this._router.navigate(['/home']);
      },
        err => {
          console.log(err);
          this.loading = false;
          this.registerError = true;
          this.registerErrorMessage = err.message;
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