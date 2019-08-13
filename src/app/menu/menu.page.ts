import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { WidgetUtilServiceService } from '../widget-util-service.service';
import { AuthService } from '../auth/auth.service';

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
  constructor(private widgetUtilService: WidgetUtilServiceService,
    private authService:AuthService) { }

  ngOnInit() {
  }

  showLogoutPopUp() {
    this.widgetUtilService.presentAlertConfirm('Confirm', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Logout Cancelled');
        }
      }, {
        text: 'Okay',
        handler: async () => {
          this.authService.logout();
        }
      }
    ])
  }

}
