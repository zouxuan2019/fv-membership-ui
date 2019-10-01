import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(public http: HttpClient) {

    console.log('Hello StorageProvider Provider');
  }

  //localStorage

  set(key, value) {

    localStorage.setItem(key, JSON.stringify(value));
    /*object to string*/
  }

  get(key) {
    return JSON.parse(localStorage.getItem(key));
    /*string to object*/
  }

  remove(key) {

    localStorage.removeItem(key);
  }

  clearSession() {

  }

  clearStorage() {
    localStorage.clear;
  }


}
