import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  displayName = 'null';
  emailSent: boolean;
  private _user: firebase.User = null;


  constructor(private _router: Router, private firebaseAuth: AngularFireAuth) {
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
    this._user.sendEmailVerification()
      .then(function () {
        this.emailSent = true;
      });
  }


  login(userLoginData) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(userLoginData.email, userLoginData.password)
        .then(res => {
          res.user.emailVerified ? resolve(res) : reject({
            message: 'Email not verified'
          });
        }, err => reject(err))
    });
  }


  isLoggedIn() {
    return firebase.auth().currentUser;
  }


  logout() {
    let me = this;

    firebase.auth().signOut().then(function () {
      //me._user = null;
      me._router.navigate(['/']);
    }).catch(function (err) {
      console.log(err);
    });

  }


  updateAuthState(user) {
    this._user = user;
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
