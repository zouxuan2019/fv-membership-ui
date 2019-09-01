import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      (res) => {
        this.router.navigateByUrl('menu/home');
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
    alert('browser');
  }
}
