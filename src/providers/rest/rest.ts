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
                       .set('StaffID', username)
                       .set('Password',password);
                       
   var url=this.config.GetBaseApi()+this.config.LoginUrl;
  
   return this.http.post<any>(url, httpParams);
  }
 
  AccountCheck(account){
    console.log(account);
    var httpParams = new HttpParams()
                       .set('StaffID', account);
    var url=this.config.GetBaseApi()+this.config.forgetPasswordUrl;                  
    return this.http.post<any>(url,httpParams);

  }

  
  UpdatePassword(staffID,token,password){
    console.log(staffID+token+password);
   
    var httpParams = new HttpParams()
    .set('StaffID', staffID)
    .set('Password',password)
    .set('TempKey',token);
    var url=this.config.GetBaseApi()+this.config.resetPasswordUrl;
    return this.http.post<any>(url, httpParams);
    
  }
  
  

  
  //others
  
  // private extractData(res: Response) {
  //   let body = res;
  //   return body || { };
  // }
  
  // private handleError (error: Response | any) {
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const err = error || '';
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   console.error(errMsg);
  //   return Observable.throw(errMsg);
  // }
}
