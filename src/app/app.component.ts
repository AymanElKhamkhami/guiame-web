import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthenticationService } from './services/authentication.service';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

//This is a decorator, it specifies that the 'AppComponent' class is not just a plain class, but a class representing component
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'guíame';
  date = (new Date()).getFullYear();
  registerDialogRef: MatDialogRef<RegisterComponent>;
  loginDialogRef: MatDialogRef<LoginComponent>;

  constructor(private _dialog: MatDialog, private _authService: AuthenticationService) { }

  showRegister() {
    this.registerDialogRef = this._dialog.open(RegisterComponent, {
      width: '500px'
    });
  }

  showLogin() {
    this.loginDialogRef = this._dialog.open(LoginComponent, {
      width: '500px'
    });
  }

}
