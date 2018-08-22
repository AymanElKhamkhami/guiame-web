import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private _authService: AuthenticationService, private _router: Router/*, private _activeRoute: ActivatedRouteSnapshot*/) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    if(this._authService.loggedIn()) {
      if(state.url == '/') {
        this._router.navigate(['/home']);
        return false;
      } else if(state.url == '/home') {
        return true;
      }
    } else {
      if(state.url == '/') {
        return true;
      } else if(state.url == '/home') {
        this._router.navigate(['/']);
        return false;
      }
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // if(this._authService.loggedIn()) {
    //   if(state.url == '/') {
    //     this._router.navigate(['/home']);
    //   } 
    //   return true;
    // } else {
    //   if(state.url == '/home') {
    //     this._router.navigate(['/']);
    //   }
    //   return false;
    // }
    if(this._authService.loggedIn()) {
      if(state.url == '/') {
        this._router.navigate(['/home']);
        return false;
      } else if(state.url == '/home') {
        return true;
      }
    } else {
      if(state.url == '/') {
        return true;
      } else if(state.url == '/home') {
        this._router.navigate(['/']);
        return false;
      }
    }
  }  
}
