import {Component, OnInit} from '@angular/core';
import {EWalletTransModel} from './e-wallet-trans-model';
import {AuthorizedPageBaseService} from '../../authorized-page-base.service';
import {EWalletService} from '../e-wallet.service';
import {AuthService} from '../../auth/auth.service';
import {EWalletDto} from '../EWalletDto';

@Component({
    selector: 'app-transaction-history',
    templateUrl: './transaction-history.page.html',
    styleUrls: ['./transaction-history.page.scss'],
})
export class TransactionHistoryPage extends AuthorizedPageBaseService implements OnInit {

    history: EWalletTransModel[] = [];

    constructor(private eWalletService: EWalletService, private authService: AuthService) {
        super();
        authService.getUserName().then(userName => {
            eWalletService.getTransactionHistoryByUserId(userName)
                .then(x => {
                    this.setDeductHistories(x);
                    this.setTopUpHistories(x);
                    this.history.sort((a, b) => {
                        return b.actionDate.localeCompare(a.actionDate);
                    });
                });
        });
    }

    private setDeductHistories(x: EWalletDto) {
        x.deductHistories
            .filter(top => top.status !== 'Init')
            .forEach(deduct => {
                const deductModel = new EWalletTransModel();
                deductModel.source = 'Deduct';
                deductModel.amount = deduct.amount;
                deductModel.status = deduct.status;
                deductModel.actionDate = deduct.actionDate;
                this.history.push(deductModel);
            });
    }

    private setTopUpHistories(x: EWalletDto) {
        x.topUpHistories
            .filter(top => top.status !== 'Init')
            .forEach(deduct => {
                const topupModel = new EWalletTransModel();
                topupModel.source = 'TopUp';
                topupModel.amount = deduct.amount;
                topupModel.status = deduct.status;
                topupModel.actionDate = deduct.actionDate;
                this.history.push(topupModel);
            });
    }

    ngOnInit() {
    }

}
