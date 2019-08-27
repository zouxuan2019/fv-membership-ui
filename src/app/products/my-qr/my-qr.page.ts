import { Component, OnInit } from '@angular/core';
import{QR} from './my_qr_model';
@Component({
  selector: 'app-my-qr',
  templateUrl: './my-qr.page.html',
  styleUrls: ['./my-qr.page.scss'],
})
export class MyQrPage implements OnInit {
  items:QR[] = [
    {product:'Orange Juice $2',  quantity:1,expiryDate:'20/08/2020',},
    {product:'Orange Juice $3', quantity:2,expiryDate:'20/08/2020',},
    {product:'Orange Juice $4', quantity:3,expiryDate:'20/08/2020',}];

  constructor() { }

  ngOnInit() {
  }

}
