import { Component, OnInit } from '@angular/core';
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
      children: [
        {
          title: 'Top Up',
          url: '/menu/e-wallet/topup',
          icon: 'card'
        },
        {
          title: 'Transaction History',
          url: '/menu/e-wallet/transaction-history',
          icon: 'more'
        }
      ]

    },
    {
      title: 'Products',
      children: [
        {
          title: 'Purchase',
          url: '/menu/products/purchase',
          icon: 'heart'
        },
        {
          title: 'My QR',
          url: '/menu/products/my-qr',
          icon: 'happy'
        },
        {
          title: 'Transaction History',
          url: '/menu/products/transaction-history',
          icon: 'more'
        }
      ]
    }
  ];
  constructor(private widgetUtilService: WidgetUtilServiceService,
    private authService: AuthService) { }

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
    ]);
  }

}
