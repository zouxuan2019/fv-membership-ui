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

  isLoadFacebookSdkJs() {
    return !(this.platform.is('cordova'));
  }

  loginWithFacebook(): Promise<User> {
    return this.nativeFacebookService.loginWithNativeFacebook();
    if (!this.isLoadFacebookSdkJs()) {
      return this.nativeFacebookService.loginWithNativeFacebook();
    } else {
      return this.loginWithBrowerFacebook();
    }
  }

  loginWithBrowerFacebook(): Promise<User> {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus((statusRes) => {
        if (statusRes.status === 'connected') {
          this.getCurrentUserInfoFromFB(resolve);
        } else {
          FB.login((loginRes) => {
            if (loginRes.status === 'connected') {
              this.getCurrentUserInfoFromFB(resolve);
            } else {
              reject('login failed');
            }
          });
        }
      });
    });
  }

  private getCurrentUserInfoFromFB(resolve) {
    FB.api('/me', { fields: 'id,name,email,picture' }, (userRes) => {
      const user: User = { name: userRes.name, email: userRes.email, password: '' };
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
