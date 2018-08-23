import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthenticationService } from './services/authentication.service';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PromptComponent } from './components/prompt/prompt.component';

//This is a decorator, it specifies that the 'AppComponent' class is not just a plain class, but a class representing component
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'guíame';
  date = (new Date()).getFullYear();
  registerDialogRef: MatDialogRef<RegisterComponent>;
  loginDialogRef: MatDialogRef<LoginComponent>;
  promptDialogRef: MatDialogRef<PromptComponent>;
  private _dialogConfig;


  constructor(private _dialog: MatDialog, private _authService: AuthenticationService) { }

  ngOnInit() {
    let me = this;
    this._dialogConfig = {
      panelClass: 'app-dialog',
      width: '500px',
      data: null
    };

    this._authService.emailSent.subscribe((sent: boolean) => {
      let data = { promptType: 'emailSent' };
      if (sent) me.showPrompt(data);
    });
  }

  showRegister() {
    this.registerDialogRef = this._dialog.open(RegisterComponent, this._dialogConfig);
  }

  showLogin() {
    this.loginDialogRef = this._dialog.open(LoginComponent, this._dialogConfig);
  }

  showPrompt(data) {
    this._dialogConfig.data = data;
    this.promptDialogRef = this._dialog.open(PromptComponent, this._dialogConfig);
  }

}
