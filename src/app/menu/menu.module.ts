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
      { path: 'e-wallet', loadChildren: '../e-wallet/e-wallet.module#EWalletPageModule' },
      { path: 'products', loadChildren: '../products/products.module#ProductsPageModule' },
      { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
      { path: 'logout', loadChildren: '../logout/logout.module#LogoutPageModule' }
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
