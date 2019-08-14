import { Component, OnInit } from '@angular/core';
import { TopupBo } from './topup-bo';

@Component({
  selector: 'app-topup',
  templateUrl: './topup.page.html',
  styleUrls: ['./topup.page.scss'],
})
export class TopupPage implements OnInit {

  user: any = { name: 'Zou Xuan', balance: 100 };
  constructor() { }

  ngOnInit() {
  }

  fomopay(form) {
    console.log(form.value);

  }

  transferToFomo(topup: TopupBo) {

  }



}
