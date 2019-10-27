import {Component, OnInit} from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import {AuthService} from '../auth.service';
import {NgForm} from '@angular/forms';
import {JwtTokenService} from '../jwt-token.service';
import {Plugins} from '@capacitor/core';
import {WidgetUtilServiceService} from '../../widget-util-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    constructor(private authService: AuthService, private router: Router, private jwtTokenService: JwtTokenService,
                private widgetUtilServiceService: WidgetUtilServiceService) {
    }

    ngOnInit() {
        Plugins.Storage.get({key: 'authData'}).then(x => {
            if (x.value !== null) {
                window.location.pathname = '/menu/home';
            }
        });
    }

    login(form: NgForm) {
        this.authService.login(form.value)
            .subscribe(
                (res) => {
                    if (res.access_token) {
                        this.routeToHome(form.value.email);
                    } else {
                        console.log(res);
                        this.widgetUtilServiceService.presentToast('Ops!!There are some error occurred in login, please contact administrator');
                    }
                },
                err => {
                    this.widgetUtilServiceService.presentToast('Ops!!There are some error occurred in login, please contact administrator');
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
