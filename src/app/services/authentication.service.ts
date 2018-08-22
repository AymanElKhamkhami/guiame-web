import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _loginUrl = 'http://localhost:3000/users/login';
  private _registerUrl = 'http://localhost:3000/users/register';
  displayName = 'user';
  user: firebase.User;
  private _authSubsription: Subscription;
  emailSent: boolean;


  constructor(private _http: HttpClient, private _router: Router, private _firebaseAuth: AngularFireAuth) {
    this._authSubsription = _firebaseAuth.authState.subscribe( user => {
      if (user) { this.user = user }
      if(!user) { this.user = null }
    });
  }

  registerUser(userRegisterData) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(userRegisterData.email, userRegisterData.password)
        .then(res => {
          this.verifyUser();
          resolve(res);
        }, err => reject(err))
    });
  }

  verifyUser() {
    //var user = firebase.auth().currentUser;
    this.user.sendEmailVerification()
      .then(function () {
        this.emailSent = true;
      });
  }

  loginUser(userLoginData) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInAndRetrieveDataWithEmailAndPassword(userLoginData.email, userLoginData.password)
        .then(res => {
          res.user.emailVerified ? resolve(res) : reject({
            message: 'Email not verified'
          });
        }, err => reject(err))
    });
  }

  loggedIn() {
    // var user = firebase.auth().currentUser;
    // if (user && user.emailVerified)
    //   return true;

    // return false;

    return this.user;
  }


  logoutUser() {
    let me = this;
    this._authSubsription.unsubscribe();
    //firebase.auth().signOut().then(function () {
      //me._router.navigate(['/']);
    //}).catch(function (err) {
    //  console.log(err);
    //});

    this._firebaseAuth.auth.signOut();
    
  }

  //local registration
  // registerUser(userRegisterData) {
  //   return this._http.post<any>(this._registerUrl, userRegisterData);
  // }

  //local login
  // loginUser(userLoginData) {
  //   return this._http.post<any>(this._loginUrl, userLoginData);
  // }

  //local logout
  // logoutUser() {
  //   localStorage.removeItem('token');
  //   this._router.navigate(['/login']);
  // }

  // local auth verification
  // loggedIn() {
  //   return !!localStorage.getItem('token'); //double negation to check if the item exists in the local storage
  // }

  getToken() {
    return localStorage.getItem('token');
  }

}
