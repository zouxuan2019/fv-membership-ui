import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlFactoryService {

  constructor() { }

  public getUrl(serviceName: string): string {
    if (environment.production) {
      return this.getProductionUrl(serviceName);
    } else {
      return this.getLocalUrl(serviceName);
    }
  }

  private getProductionUrl(serviceName: string): string {
    switch (serviceName) {
      case 'auth':
        return 'https://fvmembership-auth.appspot.com';
      default:
        return '';
    }
  }

  private getLocalUrl(serviceName: string): string {
    switch (serviceName) {
      case 'auth':
        return 'https://localhost:7001';
      default:
        return '';
    }
  }
}
