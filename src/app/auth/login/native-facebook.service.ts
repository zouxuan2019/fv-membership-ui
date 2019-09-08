import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class NativeFacebookService {

  constructor(private facebook: Facebook) { }

  loginWithNativeFacebook(): Promise<User> {
    this.facebook.logEvent(this.facebook.EVENTS.EVENT_NAME_ADDED_TO_CART);
    return new Promise((resolve, reject) => {
      this.facebook.getLoginStatus().then(statusRes => {
        if (statusRes.status === 'connected') {
          this.getCurrentUserInfoFromFB(resolve, statusRes.authResponse.accessToken);
        } else {
          this.facebook.login(['email','public_profile']).then((loginRes: FacebookLoginResponse) => {
            if (loginRes.status === 'connected') {
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
    this.facebook.api('/me', ['email','public_profile']).then(userRes => {
      const user: User = { name: userRes.name, email: userRes.email, password: '', accessToken: token };
      resolve(user);
    });
  }
}
