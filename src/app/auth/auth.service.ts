import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user';
import { AuthResponse } from './auth-response';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { FacebookService } from './login/facebook.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSubject = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient, private router: Router, private facebookService: FacebookService) {
    if (facebookService.isLoadFacebookSdkJs()) {
      facebookService.initialFacebookSdkJs();
    }
  }

  register(user: User): Observable<AuthResponse> {
    return this.getAuthResponse(`register`, user);
  }

  login(user: User): Observable<AuthResponse> {
    return this.getAuthResponse('/proxy/auth/connect/token', user);
  }

  loginWithFacebook(): Observable<AuthResponse> {
    const url = '/proxy/auth/ExchangeToken/jwt';
    const res = this.facebookService.loginWithFacebook();
    return new Observable(observer => {
      res.then(user => {
        this.getAuthResponseForSocialMedia(url, 'Facebook', user.accessToken).subscribe(x => {
          observer.next(x);
        });
      }).catch(err => {
        console.log(err);
        observer.error(err);
      });
    });
  }

  getAuthResponse(url: string, user: User): Observable<AuthResponse> {
    console.log(url);
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', 'FvMembershipClientId')
      .set('client_secret', 'FvMembershipClientSecret')
      .set('scope', 'FvMembership')
      .set('username', user.email)
      .set('password', user.password);
    const header = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.httpClient.post<AuthResponse>(`${url}`, body.toString(), header)
      .pipe(tap(async (res: AuthResponse) => {
        if (res.access_token) {
          await this.storeUserAuthData(res);
        }
        this.authSubject.next(true);
      }
      )
      );
  }

  getAuthResponseForSocialMedia(url: string, source: string, token: string): Observable<AuthResponse> {
    console.log(url);
    const body = {
      Source: source,
      Token: token
    };
    const header = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    try {
      return this.httpClient.post<AuthResponse>(`${url}`, JSON.stringify(body), header).pipe(
        tap(async (res: AuthResponse) => {
          if (res.access_token) {
            console.log(res.access_token);
            await this.storeUserAuthData(res);
          } else {
            console.log('no response');
          }
          this.authSubject.next(true);
        }
        )
      );
    } catch (ex) {
      console.log(ex);
    }
  }

  async storeUserAuthData(authResponse: AuthResponse) {
    authResponse.expires_at = Date.now() - authResponse.expires_in;
    const data = JSON.stringify(authResponse);
    await Plugins.Storage.set({ key: 'authData', value: data });
  }

  async logout() {
    Plugins.Storage.remove({ key: 'authData' });
    this.authSubject.next(false);
    this.router.navigateByUrl('login');
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
}
