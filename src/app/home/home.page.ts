import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: any = { name: 'Zou Xuan', balance: 100 };

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.user.name = this.router.getCurrentNavigation().extras.state.user;
      }
    });
    Plugins.Storage.get({ key: 'authData' }).then(x => alert(x.value));
  }

}
