import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { User } from '../user';
import { AuthResponse } from '../auth-response';

declare var window: any;
declare var FB: any;

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor(private platform: Platform) { }

  isLoadFacebookSdkJs() {
    return !(this.platform.is('cordova'));
  }

  loginWithNativeFacebook(): Promise<User> {
    alert('native');
    return new Promise(resolve => { resolve(null); });
  }


  loginWithFacebook(): Promise<User> {
    if (!this.isLoadFacebookSdkJs()) {
      return this.loginWithNativeFacebook();
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
          FB.login((response) => {
            if (response.status === 'connected') {
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
    FB.api('/me', {fields: 'id,name,email,picture'}, async (userRes) => {
      const user: User = {name: userRes.name, email: userRes.email, password: ''};
      resolve(user);
    });
  }

  initialFacebookSdkJs() {
    (((d, s, id) => {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk'));


    window.fbAsyncInit = () => {
      console.log('fb async init')
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
