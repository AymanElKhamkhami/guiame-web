import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthenticationService, private _router: Router, private firebaseAuth: AngularFireAuth) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.firebaseAuth.authState.map((user) => {
      //Note that this will still keep unverified users in the localStorage (We need to keep those data in case we need it to re-send verification email for example)
      this._authService.updateAuthState(user.emailVerified ? user : null);
      if (user && user.emailVerified) {
        this._authService.displayName = user.email.split('@')[0];
        if (state.url == '/') {
          this._router.navigate(['/home']);
          return false;
        } else if (state.url == '/home') {
          return true;
        }
      } else {
        if (state.url == '/') {
          return true;
        } else if (state.url == '/home') {
          this._router.navigate(['/']);
          return false;
        }
      }
    }).take(1);

  }

}
