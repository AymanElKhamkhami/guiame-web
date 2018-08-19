import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _loginUrl = 'http://localhost:3000/users/login';
  private _registerUrl = 'http://localhost:3000/users/register';
  displayName = 'user';

  constructor(private _http: HttpClient, private _router: Router, private _firebaseAuth: AngularFireAuth) { }

  registerUser(userRegisterData) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(userRegisterData.email, userRegisterData.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    });
  }

  loginUser(userLoginData) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInAndRetrieveDataWithEmailAndPassword(userLoginData.email, userLoginData.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    });
  }

  loggedIn() {
    //var logged =  this._firebaseAuth.authState.pipe(first()).toPromise();
    var currentUser = firebase.auth().currentUser;
    return currentUser;
  }

  //local registration
  // registerUser(userRegisterData) {
  //   return this._http.post<any>(this._registerUrl, userRegisterData);
  // }

  //local login
  // loginUser(userLoginData) {
  //   return this._http.post<any>(this._loginUrl, userLoginData);
  // }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  // local auth verification
  // loggedIn() {
  //   return !!localStorage.getItem('token'); //double negation to check if the item exists in the local storage
  // }

  getToken() {
    return localStorage.getItem('token');
  }

}
