import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  Router
} from '@angular/router';
import { WidgetUtilServiceService } from '../widget-util-service.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private router: Router, public widgetUtilServiceService: WidgetUtilServiceService, private storage: Storage) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._setHeaderToken(request);
    this._setHeaderContentType(request);

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (error.error.success === false) {
            this.widgetUtilServiceService.presentToast('Login failed');
          } else {
            this.router.navigate(['login']);
          }
          return throwError(error);
        }
      }));
  }

  _setHeaderToken(request: HttpRequest<any>) {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': `bearer ${token}`
        }
      })
    }
  }

  _setHeaderContentType(request: HttpRequest<any>) {
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json'
        }
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });
  }
}
