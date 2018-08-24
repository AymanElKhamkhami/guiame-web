import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  displayName: string;
  emailSent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userVerified: boolean = true;
  private _user: firebase.User = null;


  constructor(private _router: Router, private firebaseAuth: AngularFireAuth) { }


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
    var currentUser = firebase.auth().currentUser;
    var me = this;
    currentUser.sendEmailVerification()
      .then(function () {
        //me.emailSent = true;
        //me.emailSent = new BehaviorSubject<boolean>(true);
        me.emailSent.next(true);
      });
  }


  login(userLoginData) {
    this.userVerified = true;
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(userLoginData.email, userLoginData.password)
        .then(res => {
          if (res.user.emailVerified) {
            resolve(res);
          } else {
            this.userVerified = false;
            reject({message: 'Email not verified'});
          }
        }, err => {
          reject(err);
        })
    });
  }


  isLoggedIn() {
    // let currentUser = firebase.auth().currentUser;
    // return currentUser && currentUser.emailVerified;
    return this._user;
  }


  logout() {
    let me = this;

    firebase.auth().signOut().then(function () {
      me._user = null;
      me._router.navigate(['/']);
    }).catch(function (err) {
      console.log(err);
    });

  }


  updateAuthState(user) {
    if (user) {
      if (user.emailVerified) {
        this._user = user;
      } else {
        this._user = null;
      }
      this.userVerified = user.emailVerified;
    } else {
      this._user = user;
    }
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
