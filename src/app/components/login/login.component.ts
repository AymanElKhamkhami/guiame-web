import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {}

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

  loginUser() {
    this.auth.loginUser(this.loginUserData)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  }

}
