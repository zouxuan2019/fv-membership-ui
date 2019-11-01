import {Component, OnInit} from '@angular/core';
import {Product} from './Product';
import { AlertController} from '@ionic/angular';
import {AuthorizedPageBaseService} from '../../authorized-page-base.service';

@Component({
    selector: 'app-purchase',
    templateUrl: './purchase.page.html',
    styleUrls: ['./purchase.page.scss'],
})
export class PurchasePage extends AuthorizedPageBaseService implements OnInit {

    items: Product[] = [
        {name: 'Orange Juice', price: '$3', quantity: 0},
        {name: 'Orange Juice', price: '$2', quantity: 0},
        {name: 'Orange Juice', price: '$4', quantity: 0}];

    increaseQty(item: Product) {
        item.quantity += 1;
    }

    decreaseQty(item: Product) {
        if (item.quantity - 1 < 0) {
            item.quantity = 0;
        } else {
            item.quantity -= 1;
        }
    }

    constructor(public alertCtrl: AlertController) {
        super();
    }

    ngOnInit() {
    }

    cart() {
       this.performAlert('Successfully add to cart.');  
    }

    submit() {
        this.performAlert('Successfully purchased.');  
    }

    async performAlert(msg: any) {
        console.log(msg);
        const alert = await this.alertCtrl.create({
          header: 'Info',
          message: msg,
          buttons: ['OK']
        });
    
        await alert.present();
      }
}



