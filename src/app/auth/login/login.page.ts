import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private platform: Platform) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    this.authService.login(form.value).subscribe(
      () => {
        this.routeToHome(form.value.email);
      }
    );
  }
  loginWithFacebook() {
    if (this.platform.is('cordova')) {
      this.loginWithNativeFacebook();
    } else {
      this.loginWithBrowerFacebook();
    }
  }

  loginWithNativeFacebook() {
    alert('native');
  }

  loginWithBrowerFacebook() {
    this.routeToHome('browser');
  }

  routeToHome(userName: string) {
    const navigationExtras: NavigationExtras = {
      state: {
        user: userName
      }
    };
    this.router.navigate(['menu/home'], navigationExtras);
  }
}
