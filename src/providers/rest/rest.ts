import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigProvider } from '../config/config';




@Injectable()
export class RestProvider {
  constructor(public http: HttpClient, public config: ConfigProvider) {
    console.log('Hello RestProvider Provider');
  }

  GetHeaders() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }



  DoLogin(Username, Password): Observable<any> {
    console.log(Username);

    const postData = {
      username: Username,
      password: Password
    };
    const url = this.config.GetBaseApi() + this.config.LoginUrl;

    return this.http.post<any>(url, postData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }


  Register(Username: any, Password: any, Email: any) {

    const postData = {
      username: Username,
      password: Password,
      email: Email
    };
    const url = this.config.GetBaseApi() + this.config.RegisterUrl;
    return this.http.post<any>(url, postData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  ForgetPassword(Email: any) {
    const postData = {
      email: Email
    };

    const url = this.config.GetBaseApi() + this.config.forgetPasswordUrl;
    return this.http.post<any>(url, postData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  ResetPassword(Token: string, Currentp: string, Newp: string, Email: string) {
    console.log(Token + Currentp + Newp + Email);
    const postData = {
      token: Token,
      currentPassword: Currentp,
      newPassword: Newp,
      email: Email
    };

    const url = this.config.GetBaseApi() + this.config.resetPasswordUrl;
    return this.http.post<any>(url, postData, {
      headers: { 'Content-Type': 'application/json' }
    });

  }
  SendOTP(Email: string) {
    console.log(Email);

    const postData = {
      email: Email
    };

    const url = this.config.GetBaseApi() + this.config.SendOtpUrl;
    return this.http.post<any>(url, postData, {
      headers: { 'Content-Type': 'application/json' }
    });

  }





}
