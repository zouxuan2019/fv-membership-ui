import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

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

  loginWithNativeFacebook() {
    alert('native');
  }

  loginWithBrowerFacebook() {
    FB.login((response) => {
      if (response.status === 'connected') {
        FB.api('/me?fields=email,name', (userRes) => {
          console.log('Good to see you, ' + userRes.name + '.');
        });
      }
    }, { scope: 'public_profile,email' });
  }

  initialFacebookSdkJs() {
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


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
