import {Component, OnInit} from '@angular/core';
import {ProductTransModel} from './product_transaction_model';
import {AuthorizedPageBaseService} from '../../authorized-page-base.service';

@Component({
    selector: 'app-transaction-history',
    templateUrl: './transaction-history.page.html',
    styleUrls: ['./transaction-history.page.scss'],
})
export class TransactionHistoryPage extends AuthorizedPageBaseService implements OnInit {
    history: ProductTransModel[] = [
        {amount: 100, product: 'Orange Juice $3', quantity: 2, date: '2019-08-22 11:00'},
        {amount: 20, product: 'Orange Juice $2', quantity: 2, date: '2019-08-11 22:00'},
        {amount: 20, product: 'Orange Juice $3', quantity: 2, date: '2019-08-10 07:00'}];

    constructor() {
        super();
    }

    ngOnInit() {
    }
}
