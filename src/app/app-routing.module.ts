import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' },
  { path: 'topup', loadChildren: './e-wallet/topup/topup.module#TopupPageModule' },
  { path: 'transaction-inquiry', loadChildren: './e-wallet/transaction-inquiry/transaction-inquiry.module#TransactionInquiryPageModule' },
  { path: 'purchase', loadChildren: './products/purchase/purchase.module#PurchasePageModule' },
  { path: 'my-qr', loadChildren: './products/my-qr/my-qr.module#MyQrPageModule' },
  { path: 'transaction-history', loadChildren: './products/transaction-history/transaction-history.module#TransactionHistoryPageModule' },
  { path: 'transaction-history', loadChildren: './e-wallet/transaction-history/transaction-history.module#TransactionHistoryPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
