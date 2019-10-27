import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'reset-password', loadChildren: './auth/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'callback', loadChildren: './e-wallet/payment/callback/callback.module#CallbackPageModule' },
  { path: 'return', loadChildren: './e-wallet/payment/return/return.module#ReturnPageModule' },  { path: 'forget-password', loadChildren: './forget-password/forget-password.module#ForgetPasswordPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
