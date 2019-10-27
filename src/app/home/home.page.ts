import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Plugins} from '@capacitor/core';
import {AuthorizedPageBaseService} from '../authorized-page-base.service';
import {EWalletService} from '../e-wallet/e-wallet.service';
import {AuthService} from '../auth/auth.service';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage extends AuthorizedPageBaseService {

    user: any = {name: 'Zou Xuan', balance: 0};

    constructor(private route: ActivatedRoute, private router: Router,
                private eWalletService: EWalletService, private authService: AuthService) {
        super();
        authService.getUserName().then(userName => {
            this.user.name = userName;
            eWalletService.getTransactionHistoryByUserId(userName)
                .then(x => {
                    this.user.balance = x.balance;
                }).catch(x => alert('getTransactionHistoryErro'));
        });
        Plugins.Storage.get({key: 'authData'}).then(x => console.log(x.value));

    }

}
