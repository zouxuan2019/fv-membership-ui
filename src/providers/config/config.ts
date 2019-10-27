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
  public apiUrl = 'http://localhost:8085/fv/v1.0/'; // Development
  // public apiUrl="http://10.218.66.12/API/api/"; //Testing
  // public apiUrl = "http://101.127.210.98:7043/V2/api/";//cloud



  public RegisterUrl = this.apiUrl + 'register';
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
