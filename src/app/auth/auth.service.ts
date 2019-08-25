import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user';
import { AuthResponse } from './auth-response';
import { longStackSupport } from 'q';
import { Router } from '@angular/router';
// import {Plugins} from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSubject = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient, private router: Router) { }

  register(user: User): Observable<AuthResponse> {
    return this.getAuthResponse(`register`, user);
  }

  login(user: User): Observable<AuthResponse> {
    return this.getAuthResponse('/proxy/auth/connect/token', user);
  }

  getAuthResponse(url: string, user: User): Observable<AuthResponse> {
    const body = new HttpParams()
    .set('grant_type', 'password')
    .set('client_id', 'ijoozClientId')
    .set('client_secret', 'ijoozClientIdSecret')
    .set('scope', 'ijooz')
    .set('username', user.email)
    .set('password', user.password);
    const header = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    // return this.httpClient.post<AuthResponse>(`${url}`, body.toString(), header);
    return this.httpClient.post<AuthResponse>(`${url}`, body.toString(), header).pipe(
      tap(async (res: AuthResponse) => {
        if (res.access_token) {
          // this.storeUserAuthData(res);
          console.log(res.access_token);
        }
          this.authSubject.next(true);
        }
      )
    );
    // localStorage.setItem('ACCESS_TOKEN',"aaaaaaa");
    // console.log(localStorage.getItem('ACCESS_TOKEN'));
    // return new Observable(observer => {
    //   const res: AuthResponse ={
    //     access_token: 'token',
    //     expires_in: 12345
    //   };
    //   observer.next(res);
    //   observer.complete();
    // });
  }

//   storeUserAuthData(authResponse) {
// const data = JSON.stringify(authResponse);
//     Plugins.Storage.set({ key: 'authData', value: data});
//   }

  async logout() {
    // await this.storage.remove("ACCESS_TOKEN");
    // await this.storage.remove("EXPIRES_IN");
    this.authSubject.next(false);
    this.router.navigateByUrl('login');
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
}
