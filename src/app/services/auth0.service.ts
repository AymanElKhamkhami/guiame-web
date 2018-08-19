import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';

(window as any).global = window;

@Injectable()
export class Auth0Service {

  authenticated: boolean = false;
    
  auth0 = new auth0.WebAuth({
    clientID: 'uVj3auKzpLF9RwBL3HuliDlh7K2walPM',
    domain: 'ayman-khm.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://ayman-khm.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid'
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

}