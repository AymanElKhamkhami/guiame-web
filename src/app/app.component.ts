import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

//This is a decorator, it specifies that the 'AppComponent' class is not just a plain class, but a class representing component
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'guíame';
  date = (new Date()).getFullYear();

  constructor(private _authService: AuthenticationService) { }
}
