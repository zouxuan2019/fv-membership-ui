import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// import { templateJitUrl } from '@angular/compiler';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {
  // public apiUrl = 'https://localhost:8085/fv/v1.0/'; // Development
  public apiUrl = 'https://ijooze.xyz:8085/fv/v1.0/'; // cloud



  public RegisterUrl = 'register';
  public LoginUrl = 'login';
  public forgetPasswordUrl = 'forgotpassword';
  public resetPasswordUrl = 'changepassword';
  public SendOtpUrl = 'sendOtp';

  constructor() {
    console.log('Hello ConfigProvider Provider');
  }

  UpdateIpAddress(newIp: string) {
    this.apiUrl = newIp;
  }

  GetBaseApi() {
    return this.apiUrl;
  }

}
