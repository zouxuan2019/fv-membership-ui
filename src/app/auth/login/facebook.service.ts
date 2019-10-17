import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { User } from '../user';
import { NativeFacebookService } from './native-facebook.service';


declare var window: any;
declare var FB: any;

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor(private platform: Platform, private nativeFacebookService: NativeFacebookService) { }

  isPlatformCordova() {
    return this.platform.is('cordova');
  }

  loginWithFacebook(): Promise<User> {
    if (this.isPlatformCordova()) {
      return this.nativeFacebookService.loginWithNativeFacebook();
    } else {
      return this.loginWithBrowserFacebook();
    }
  }

  loginWithBrowserFacebook(): Promise<User> {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus((statusRes) => {
        if (statusRes.status === 'connected') {
          console.log(statusRes.authResponse.accessToken);
          this.getCurrentUserInfoFromFB(resolve, statusRes.authResponse.accessToken);
        } else {
          FB.login((loginRes) => {
            if (loginRes.status === 'connected') {
              console.log(loginRes.authResponse.accessToken);
              this.getCurrentUserInfoFromFB(resolve, loginRes.authResponse.accessToken);
            } else {
              reject('login failed');
            }
          });
        }
      });
    });
  }

  private getCurrentUserInfoFromFB(resolve, token: string) {
    FB.api('/me', { fields: 'id,name,email' }, (userRes) => {
      const user: User = { name: userRes.name, email: userRes.email, password: '', accessToken: token };
      resolve(user);
    });
  }

  initialFacebookSdkJs() {
    (((d, s, id) => {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk'));


    window.fbAsyncInit = () => {
      console.log('fb async init');
      FB.init({
        appId: '509258982951178',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v4.0'
      });
      FB.AppEvents.logPageView();
    };
  }
}
