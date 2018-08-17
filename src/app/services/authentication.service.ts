import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _loginUrl = 'http://localhost:3000/users/login';
  private _registerUrl = 'http://localhost:3000/users/register';

  constructor(private http: HttpClient) { }


  registerUser(userRegisterData) {
    return this.http.post<any>(this._registerUrl, userRegisterData);
  }

  loginUser(userLoginData) {
    return this.http.post<any>(this._loginUrl, userLoginData);
  }

  loggedIn() {
    return !!localStorage.getItem('token'); //double negation to check if the item exists in the local storage
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
