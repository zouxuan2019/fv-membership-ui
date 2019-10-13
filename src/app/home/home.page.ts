import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Plugins} from '@capacitor/core';
import {AuthorizedPageBaseService} from '../authorized-page-base.service';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage extends AuthorizedPageBaseService {

    user: any = {name: 'Zou Xuan', balance: 100};

    constructor(private route: ActivatedRoute, private router: Router) {
        super();
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.user.name = this.router.getCurrentNavigation().extras.state.user;
            }
        });
        Plugins.Storage.get({key: 'authData'}).then(x => console.log(x.value));
    }

}
