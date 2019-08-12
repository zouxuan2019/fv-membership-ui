import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';
import { longStackSupport } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER_ADDRESS: string = '';
  authSubject = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient, private storage: Storage) { }

  register(user: User): Observable<AuthResponse> {
    return this.getAuthResponse(`${this.AUTH_SERVER_ADDRESS}/register`, user);
  }

  login(user: User): Observable<AuthResponse> {
    return this.getAuthResponse(`${this.AUTH_SERVER_ADDRESS}/login`, user);
  }

  getAuthResponse(url: string, user: User): Observable<AuthResponse> {
    // return this.httpClient.post<AuthResponse>(`${url}`, user).pipe(
    //   tap(async (res: AuthResponse) => {
    //     if (res.name) {
    //       await this.storage.set("ACCESS_TOKEN", res.access_token);
    //       await this.storage.set("EXPIRES_IN", res.expires_in);
    //       this.authSubject.next(true);
    //     }
    //   })
    // ); 
    return new Observable(observer => {
      const res:AuthResponse={
        id:1,
        name:"abc",
        email:"email",
        access_token:"token",
        expires_in:12345
      };
      observer.next(res);
      observer.complete();
    });
  }

  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
}
