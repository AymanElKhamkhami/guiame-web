import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = { email: null, password: null };
  loginError: boolean;
  loginErrorMessage;
  loading: boolean;

  constructor(private _dialogRef: MatDialogRef<LoginComponent>, private _auth: AuthenticationService, private _router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this.loginError = false;
    this.loading = true;
    this._auth.login(this.loginUserData)
      .then(res => {
        //console.log(res);
        this.loading = false;
        //this._auth.displayName = res.user.email.split('@')[0];// 
        this._router.navigate(['/home']);
        this._dialogRef.close();
      },
        err => {
          console.log(err);
          this.loading = false;
          this.loginError = true;
          this.loginErrorMessage = err.message;
        });
  }


  //local login
  // loginUser() {
  //   this.loading = true;
  //   this._auth.loginUser(this.loginUserData)
  //     .subscribe(
  //       res => {
  //         console.log(res);
  //         this.loading = false;
  //         this._auth.name = res.userData.name;
  //         localStorage.setItem('token', res.token);

  //         this._router.navigate(['/home']);
  //       },
  //       err => {
  //         console.log(err);
  //         this.loading = false;
  //         if (err instanceof HttpErrorResponse) {
  //           if (err.status === 401) {
  //             if (err.error.message.toLowerCase() === 'invalid email') {
  //               this.loginError = true;
  //               this.loginErrorMessage = 'We don\'t recognize the email you entered';
  //             }
  //             if (err.error.message.toLowerCase() === 'invalid password') {
  //               this.loginError = true;
  //               this.loginErrorMessage = 'The password you entered does not match your email';
  //             }
  //           }
  //           else {
  //             this.loginError = true;
  //             this.loginErrorMessage = 'Something failed :/ Please try again';
  //           }
  //         }
  //       }
  //     );
  // }

}
