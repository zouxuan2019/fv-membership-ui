import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigProvider } from '../config/config';




@Injectable()
export class RestProvider {
  constructor(public http: HttpClient,public config:ConfigProvider) {
    console.log('Hello RestProvider Provider');
  }
 
  //log in
  DoLogin(username,password): Observable<any> {
    console.log(username);

    var httpParams = new HttpParams()
                       .set('username', username)
                       .set('password',password);
                       
   var url=this.config.GetBaseApi()+this.config.LoginUrl;
  
   return this.http.post<any>(url, httpParams);
  }
 
  
  Register(username,password,email){
    var httpParams = new HttpParams()
    .set('username', username)
    .set('password', password)
    .set('email',email)

    var url=this.config.GetBaseApi()+this.config.RegisterUrl;
    return this.http.post<any>(url, httpParams);
  }
  ForgetPassword(email){
    var httpParams = new HttpParams()
    .set('email',email)

    var url=this.config.GetBaseApi()+this.config.forgetPasswordUrl;
    return this.http.post<any>(url, httpParams);
  }
  
  ResetPassword(currentp,newp,email){
    console.log(currentp+newp+email);
   
    var httpParams = new HttpParams()
    .set('currentPassword', currentp)
    .set('newPassword', newp )
    .set('email',email);
    var url=this.config.GetBaseApi()+this.config.resetPasswordUrl;
    return this.http.post<any>(url, httpParams);
    
  }
  SendOTP(email){
    console.log(email);
   
    var httpParams = new HttpParams()
    .set('email',email);
    var url=this.config.GetBaseApi()+this.config.SendOtpUrl;
    return this.http.post<any>(url, httpParams);
    
  }
  
  

  
  
}
