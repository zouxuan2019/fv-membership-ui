import { Component, OnInit } from '@angular/core';
import{EWalletTransModel} from './e-wallet-trans-model';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.page.html',
  styleUrls: ['./transaction-history.page.scss'],
})
export class TransactionHistoryPage implements OnInit {

  history:EWalletTransModel[] = [
  {amount:100, source:'Top Up', status:'Fail', actionDate:'2019-08-20 20:00:01'},
  {amount:20,source:'Deduct', status:'Success', actionDate:'2019-08-19 20:00:01'},
  {amount:20,source:'Top Up', status:'Success', actionDate:'2019-08-18 09:00:01'}];

  constructor() { }

  ngOnInit() {
  }

}
