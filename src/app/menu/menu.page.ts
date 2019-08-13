import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public appPages = [
    {
      title: 'Home',
      url: '/menu/home',
      icon: 'home'
    },
    {
      title: 'E-Wallet',
      url: '/menu/e-wallet',
      icon: 'card'
    }, 
    {
      title: 'Products',
      url: '/menu/products',
      icon: 'happy'
    }
  ];


  constructor() { 

  }

  ngOnInit() {
  }

}
