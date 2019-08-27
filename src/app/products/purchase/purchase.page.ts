import { Component, OnInit } from '@angular/core';
import { Product } from './Product';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.page.html',
  styleUrls: ['./purchase.page.scss'],
})
export class PurchasePage implements OnInit {

  items: Product[] = [
    { name: 'Orange Juice', price: '$3', quantity: 0 },
    { name: 'Orange Juice', price: '$2', quantity: 0 },
    { name: 'Orange Juice', price: '$4', quantity: 0 }];


  // increment product qty
  incrementQty(item) {

    item.quantity += 1;
  }

  // decrement product qty
  decrementQty(item) {
    if (item.quantity - 1 < 1) {
      item.quantity = 1;
    } else {
      item.quantity -= 1;
    }
  }

  constructor() { }
  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchasePage');
  }
  ionViewWillEnter() {
     // this.getLeftCateData();

  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave PurchasePage');
  }
}



