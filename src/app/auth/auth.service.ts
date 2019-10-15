import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';
import {User} from './user';
import {AuthResponse} from './auth-response';
import {Router} from '@angular/router';
import {Plugins} from '@capacitor/core';
import {FacebookService} from './login/facebook.service';
import {HTTP} from '@ionic-native/http/ngx';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {UrlFactoryService} from '../url-factory.service';
import {environment} from '../../environments/environment';
import {WidgetUtilServiceService} from '../widget-util-service.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authSubject = new BehaviorSubject(false);
    isCordova: boolean;

    constructor(private httpClient: HttpClient, private nativeHttp: HTTP, private router: Router, private facebookService: FacebookService
        , private urlFactoryService: UrlFactoryService, private widgetUtilServiceService: WidgetUtilServiceService) {
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
        return this.getAuthResponse(`${this.urlFactoryService.getUrl('auth')}/connect/token`, user);
    }

    loginWithFacebook(): Observable<AuthResponse> {
        const url = `${this.urlFactoryService.getUrl('auth')}/ExchangeToken/jwt`;
        const res = this.facebookService.loginWithFacebook();
        return new Observable(observer => {
            res.then(user => {
                this.getAuthResponseForSocialMedia(url, 'Facebook', user.accessToken).subscribe(x => {
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
        const body = new HttpParams()
            .set('grant_type', 'password')
            .set('client_id', environment.fvMembership_ClientId)
            .set('client_secret', environment.fvMembership_ClientSecret)
            .set('scope', `${environment.fvMembership_Scope} offline_access`)
            .set('username', user.email)
            .set('password', user.password);
        const header = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        return this.getUserTokenFromWebHttp(url, body, header);
    }

    async getUserTokenByRefreshToken(authData: AuthResponse): Promise<AuthResponse> {
        const url = `${this.urlFactoryService.getUrl('auth')}/connect/token`;
        const body = new HttpParams()
            .set('grant_type', 'refresh_token')
            .set('client_id', environment.fvMembership_ClientId)
            .set('client_secret', environment.fvMembership_ClientSecret)
            .set('refresh_token', authData.refresh_token);

        const header = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        return this.getUserTokenFromWebHttp(url, body, header).toPromise();
    }

    getClientCredentialToken(): Observable<AuthResponse> {
        const url = environment.auth_Host;
        const body = new HttpParams()
            .set('grant_type', 'client_credentials')
            .set('client_id', environment.fvMembershipThirdPartyClientId)
            .set('client_secret', environment.fvMembershipThirdPartyClientSecret)
            .set('scope', environment.fvMembership_Scope);
        const header = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        return this.getUserTokenFromWebHttp(url, body, header);
    }

    getTokenForNativeDevices(url: string, user: User): Observable<AuthResponse> {
        const header = {'Content-Type': 'application/x-www-form-urlencoded'};
        const data = {
            grant_type: 'password',
            client_id: environment.fvMembership_ClientId,
            client_secret: environment.fvMembership_ClientSecret,
            scope: environment.fvMembership_Scope,
            username: user.email,
            password: user.password
        };
        this.nativeHttp.setDataSerializer('urlencoded');
        return this.getTokenFromNativeHttp(url, data, header);
    }

    getAuthResponseForSocialMedia(url: string, source: string, token: string): Observable<AuthResponse> {
        console.log(url);
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
                if (res.access_token) {
                    await this.storeUserAuthData(res);
                } else {
                    console.log(res);
                    this.widgetUtilServiceService.presentToast('Ops!!There are some error occurred in login, please contact administrator');
                }
                this.authSubject.next(true);
            }));
    }

    private getAuthTokenResponse(url: string, body: any, header: {
        headers?: HttpHeaders | { [header: string]: string | string[]; };
    }): Observable<AuthResponse> {
        try {
            const data = JSON.stringify(header).indexOf('application/json') > 0 ? JSON.stringify(body) : body.toString();
            return this.httpClient.post<AuthResponse>(`${url}`, data, header);
        } catch (e) {
            console.log(e);
            this.widgetUtilServiceService.presentToast('Ops!!There are some error occurred in login service, please contact administrator');
        }
    }

    private getTokenFromNativeHttp(url: string, data, header): Observable<AuthResponse> {
        const responseData = this.nativeHttp.post(url, data, header).then(async (res) => {
            console.log(res);
            if (res.status === 200) {
                const jsonData = JSON.parse(res.data);
                const authRes: AuthResponse = {
                    access_token: jsonData.access_token,
                    expires_at: Date.now() + (jsonData.expires_in / 60) * 1000 * 60,
                    expires_in: jsonData.expores_in,
                    refresh_token: jsonData.refresh_token
                };
                await this.storeUserAuthData(authRes);
                this.authSubject.next(true);
                return authRes;
            } else {
                alert(JSON.stringify(res));
                return null;
            }
        }).catch(err => {
            console.log(err);
            return null;
        });
        return fromPromise(responseData);
    }

    async storeUserAuthData(authResponse: AuthResponse) {
        authResponse.expires_at = Date.now() + (authResponse.expires_in / 60) * 1000 * 60;
        const data = JSON.stringify(authResponse);
        await Plugins.Storage.set({key: 'authData', value: data});
    }

    async logout() {
        Plugins.Storage.remove({key: 'authData'});
        this.authSubject.next(false);
        this.router.navigateByUrl('login');
    }

    isLoggedIn() {
        return this.authSubject.asObservable();
    }

    async getUserName(): Promise<string> {
        return Plugins.Storage.get({key: 'authData'}).then(x => {
            const token = x.value;
            const payload = atob(token.split('.')[1]);
            return JSON.parse(payload).sub;
        });

    }
}
