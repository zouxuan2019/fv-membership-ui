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
        const changedRequest = await this._setHeaderToken(request);
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
            if (authDataObj != null && this.isTokenExpired(authDataObj)) {
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

    isTokenExpired(authData: AuthResponse): boolean {
        return (authData.expires_at - Date.now() < 60 * 1000);
    }

    refreshToken(authData: AuthResponse): Promise<AuthResponse> {
        return this.authService.getUserTokenByRefreshToken(authData);
    }

}
