import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { JwtTokenService } from '../jwt-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private jwtTokenService: JwtTokenService) {
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
    this.authService.loginWithFacebook().subscribe(
      (response) => {
        this.routeToHome(this.jwtTokenService.getUserFromToken(response.access_token).name);
      }
    );
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
