import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from './user';
import {AuthResponse} from './auth-response';
import {Router} from '@angular/router';
import {Plugins} from '@capacitor/core';
import {FacebookService} from './login/facebook.service';
import {HTTP} from '@ionic-native/http/ngx';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {environment} from '../../environments/environment';
import {WidgetUtilServiceService} from '../widget-util-service.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isCordova: boolean;

    constructor(private httpClient: HttpClient, private nativeHttp: HTTP, private router: Router, private facebookService: FacebookService
        , private widgetUtilServiceService: WidgetUtilServiceService) {
        if (facebookService.isPlatformCordova()) {
            this.isCordova = true;
        } else {
            facebookService.initialFacebookSdkJs();
        }
    }

    register(user: User): Observable<AuthResponse> {
        return this.getAuthResponse('register', user);
    }

    login(user: User): Observable<AuthResponse> {
        return this.getAuthResponse(`${environment.auth_Host}/token/login`, user);
    }

    loginWithFacebook(): Observable<AuthResponse> {
        const res = this.facebookService.loginWithFacebook();
        return new Observable(observer => {
            res.then(user => {
                const url = `${environment.auth_Host}/ExchangeToken/jwt`;
                this.getAuthResponseForSocialMedia(url, 'Facebook', user.accessToken).subscribe(async x => {
                    await this.storeUserAuthData(x);
                    observer.next(x);
                });
            }).catch(err => {
                console.log(err);
                observer.error(err);
            });
        });
    }

    getAuthResponse(url: string, user: User): Observable<AuthResponse> {
        if (this.isCordova) {
            return this.getTokenForNativeDevices(url, user);
        } else {
            return this.getUserTokenForWebsite(url, user);
        }
    }

    getUserTokenForWebsite(url: string, user: User): Observable<AuthResponse> {
        const data = {
            username: user.email,
            password: user.password
        };
        const header = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
        return this.getUserTokenFromWebHttp(url, data, header);
    }

    async getUserTokenByRefreshToken(authData: AuthResponse): Promise<AuthResponse> {
        const url = `${environment.auth_Host}/token/refresh`;
        const data = {
            refresh_token: authData.refresh_token,
        };

        const header = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
        return this.getUserTokenFromWebHttp(url, data, header).toPromise();
    }

    getTokenForNativeDevices(url: string, user: User): Observable<AuthResponse> {
        const header = {'Content-Type': 'application/json'};
        const data = {
            username: user.email,
            password: user.password
        };
        this.nativeHttp.setDataSerializer('urlencoded');
        return this.getTokenFromNativeHttp(url, data, header);
    }

    getAuthResponseForSocialMedia(url: string, source: string, token: string): Observable<AuthResponse> {
        // console.log(url);
        const body = {
            Source: source,
            Token: token
        };
        if (this.isCordova) {
            const header = {'Content-Type': 'application/json'};
            this.nativeHttp.setDataSerializer('json');
            return this.getTokenFromNativeHttp(url, body, header);
        } else {
            const header = {
                headers: new HttpHeaders().set('Content-Type', 'application/json')
            };
            return this.getUserTokenFromWebHttp(url, body, header);
        }
    }

    private getUserTokenFromWebHttp(url: string, body: any, header: {
        headers?: HttpHeaders | { [header: string]: string | string[]; };
    }): Observable<AuthResponse> {
        return this.getAuthTokenResponse(url, body, header)
            .pipe(tap(async (res: AuthResponse) => {
                if (res != null && res.access_token) {
                    await this.storeUserAuthData(res);
                } else {
                    console.log(res);
                    this.removeAuthData();
                    this.widgetUtilServiceService.presentToast('Ops!!There are some error occurred in login, please contact administrator');
                }
            }));
    }

    private getAuthTokenResponse(url: string, body: any, header: {
        headers?: HttpHeaders | { [header: string]: string | string[]; };
    }): Observable<AuthResponse> {
        const data = JSON.stringify(header).indexOf('application/json') > 0 ? JSON.stringify(body) : body.toString();
        return this.httpClient.post<AuthResponse>(`${url}`, data, header);

    }

    private getTokenFromNativeHttp(url: string, data, header): Observable<AuthResponse> {
        const responseData = this.nativeHttp.post(url, data, header).then(async (res) => {
            console.log(res);
            if (res.status === 200) {
                const jsonData = JSON.parse(res.data);
                await this.storeUserAuthData(jsonData);
                return jsonData;
            } else {
                return null;
            }
        }).catch(err => {
            console.log(err);
            return null;
        });
        return fromPromise(responseData);
    }

    async storeUserAuthData(authResponse: AuthResponse) {
        const data = JSON.stringify(authResponse);
        await Plugins.Storage.set({key: 'authData', value: data});
    }

    async logout() {
        Plugins.Storage.get({key: 'authData'}).then(authData => {
            const authDataObj = JSON.parse(authData.value);
            if (authDataObj.source === null || authDataObj.source === undefined) {
                this.revokeRefreshToken(authDataObj);
            }
            this.removeAuthData();

        });
    }

    removeAuthData() {
        Plugins.Storage.remove({key: 'authData'}).then(() => {
            this.router.navigateByUrl('login');
        });
    }

    revokeRefreshToken(authData: AuthResponse) {
        const url = `${environment.auth_Host}/connect/revocation`;
        const body = new HttpParams()
            .set('token', authData.refresh_token)
            .set('token_type_hint', 'refresh_token');

        const header = {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('Authorization', 'Basic RnZNZW1iZXJzaGlwQ2xpZW50SWQ6RnZNZW1iZXJzaGlwQ2xpZW50U2VjcmV0')
        };
        return this.getUserTokenFromWebHttp(url, body, header).toPromise();
    }


    async getUserName(): Promise<string> {
        return Plugins.Storage.get({key: 'authData'})
            .then(x => {
                const token = x.value;
                const payload = atob(token.split('.')[1]);
                return JSON.parse(payload).sub;
            });

    }

    async getExpiresAt(): Promise<number> {
        return Plugins.Storage.get({key: 'authData'}).then(x => {
            const token = x.value;
            const payload = atob(token.split('.')[1]);
            return JSON.parse(payload).exp;
        });

    }


    getSocialMediaRefreshToken(authData: AuthResponse): Promise<AuthResponse> {
        const url = `${environment.auth_Host}/ExchangeToken/refresh`;
        return this.getAuthResponseForSocialMedia(url, 'Facebook', authData.refresh_token).toPromise();
    }
}
