import {Component, OnInit} from '@angular/core';
import {EWalletService} from '../../e-wallet.service';
import {AuthorizedPageBaseService} from '../../../authorized-page-base.service';

@Component({
    selector: 'app-return',
    templateUrl: './return.page.html',
    styleUrls: ['./return.page.scss'],
})
export class ReturnPage extends AuthorizedPageBaseService implements OnInit {
    public result: string;

    constructor(private eWalletService: EWalletService) {
        super();
        this.displayMessage();
    }

    ngOnInit() {
        this.result = 'Your topup transaction is being processed, please stay in this page until the process is completed..';
    }

    private async displayMessage() {
        const transactionId = window.sessionStorage.getItem('transactionId');
        const topUpResult = await this.eWalletService.getTopUpByTransactionId(transactionId);
        const isSuccess = topUpResult.filter(x => x.status === 'Success').length > 0;
        this.result = isSuccess ? 'Your EWallet has been topup successfully.' : 'Your EWallet topup was failed.';

    }

}
