import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      { path: 'e-wallet/topup', loadChildren: '../e-wallet/topup/topup.module#TopupPageModule' },
      { path: 'e-wallet/transaction-history', loadChildren: '../e-wallet/transaction-history/transaction-history.module#TransactionHistoryPageModule' },
      { path: 'products/purchase', loadChildren: '../products/purchase/purchase.module#PurchasePageModule' },
      { path: 'products/my-qr', loadChildren: '../products/my-qr/my-qr.module#MyQrPageModule' },
      { path: 'products/transaction-history', loadChildren: '../products/transaction-history/transaction-history.module#TransactionHistoryPageModule' },
      { path: 'home', loadChildren: '../home/home.module#HomePageModule' }
    ]
  }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }
