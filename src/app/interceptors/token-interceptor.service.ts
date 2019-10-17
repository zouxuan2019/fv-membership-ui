import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {WidgetUtilServiceService} from '../widget-util-service.service';
import {Plugins} from '@capacitor/core';
import {AuthResponse} from '../auth/auth-response';
import {AuthService} from '../auth/auth.service';
import 'rxjs/add/observable/fromPromise';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
    constructor(private router: Router, public widgetUtilServiceService: WidgetUtilServiceService,
                private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return Observable.fromPromise(this.handle(request, next));
    }

    async handle(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
        let changedRequest = request;
        if (!request.url.includes(environment.auth_Host)) {
            changedRequest = await this._setHeaderToken(request);
        }
        return next.handle(changedRequest).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.widgetUtilServiceService.presentToast('Unauthorized Request!');
                    return throwError(error);
                }
            })).toPromise();
    }

    async _setHeaderToken(request: HttpRequest<any>): Promise<HttpRequest<any>> {
        const authData = Plugins.Storage.get({key: 'authData'});
        await authData.then(async au => {
            const authDataObj = JSON.parse(au.value);
            if (authDataObj != null && await this.isTokenExpired(authDataObj)) {
                await this.refreshToken(authDataObj);
                this._setHeaderToken(request);
            }
            if (authDataObj) {
                const token = authDataObj.access_token;
                request = request.clone({
                    headers: request.headers.set(
                        'Authorization',
                        `Bearer ${token}`
                    )
                });
            }
        }).catch((e) => {
            console.log(e);
        });
        return request;
    }


    refreshToken(authData: AuthResponse) {
        if (authData.source === null) {
            this.authService.getUserTokenByRefreshToken(authData);
        } else {
            this.authService.getSocialMediaRefreshToken(authData);
        }
    }

    async isTokenExpired(authData: AuthResponse): Promise<boolean> {
        const expiresAt = await this.authService.getExpiresAt();
        const dExpiresAt = new Date(0);
        dExpiresAt.setUTCSeconds(expiresAt);
        const currentDate = new Date();
        return (dExpiresAt.getTime() - currentDate.getTime()) / 1000 / 60 < 3;
    }
}
