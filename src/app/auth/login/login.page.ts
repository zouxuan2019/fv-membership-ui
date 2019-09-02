import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { FacebookService } from './facebook.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private facebookService: FacebookService) {
    if (facebookService.isLoadFacebookSdkJs()) {
      facebookService.initialFacebookSdkJs();
    }
  }

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
    const res = this.facebookService.loginWithFacebook();
    res.then(user => {
      this.routeToHome(user.name);
    }).catch(err => {
      console.log(err);
    });

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
