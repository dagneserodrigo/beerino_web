import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router }          from '@angular/router';

import { BeerinoService }  from './beerino.service';

// Avoid name not found warnings
declare var Auth0: any;

@Injectable()
export class AuthService {

  // Configure Auth0
  auth0 = new Auth0({
    domain: 'beerino.auth0.com',
    clientID: 'Pb5WTTaeFxc9m01VgRrfUeq8aOVSP8dY',
    responseType: 'token',
    callbackURL: 'http://localhost:4200/signin-auth0',
  });

  constructor(private router: Router, private beerinoService: BeerinoService) {
    var result = this.auth0.parseHash(window.location.hash);

    if (result && result.idToken) {
      localStorage.setItem('id_token', result.idToken);
      localStorage.setItem('access_token', result.accessToken);

      this.auth0.getUserInfo(result.accessToken, (err, profile) => {
        if (err) throw err;
        else {
          localStorage.setItem('email', profile.email);

          this.beerinoService
            .getUser(profile.email)
            .subscribe((user) => {
              localStorage.setItem('sys_userId', user.userId.toString());
              localStorage.setItem('sys_name', user.name);
            })
        }
      });

      console.log("Login successful");

      this.router.navigate(['/home']);
    } else if (result && result.error) {
      alert('error: ' + result.error);
    }
  }


  public login(username, password) {
    this.auth0.login({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: username,
      password: password
    }, (err) => {
        if (err) { alert("something went wrong: " + err.message); return; }
        this.router.navigate(['/home']);
    });
  };

  public signUp(username, password) {
    this.auth0.signup({
      connection: 'Username-Password-Authentication',
      responseType: 'token',
      email: username,
      password: password
    }, (err) => {
        if (err) { alert("something went wrong: " + err.message); return; }
        this.router.navigate(['/login']);
    });
  };

  public googleLogin() {
    this.auth0.login({
        connection: 'google-oauth2',
        responseType: 'token'
    }, (err) => {
        if (err) { alert("something went wrong: " + err.message); return; }
        this.router.navigate(['/home']);
    });
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
      localStorage.removeItem('id_token');
      localStorage.removeItem('access_token');
      localStorage.removeItem('email');
  };
}
