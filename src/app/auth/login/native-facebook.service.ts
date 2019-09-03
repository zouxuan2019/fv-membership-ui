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
          this.getCurrentUserInfoFromFB(resolve);
        } else {
          this.facebook.login(['public_profile', 'email']).then((response: FacebookLoginResponse) => {
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
    this.facebook.api('/me', ['public_profile', 'email']).then(userRes => {
      const user: User = { name: userRes.name, email: userRes.email, password: '' };
      resolve(user);
    });
  }
}
