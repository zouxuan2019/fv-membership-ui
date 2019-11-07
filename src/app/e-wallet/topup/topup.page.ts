import {Component, OnInit} from '@angular/core';
import {FomoBo} from './fomo-bo';
import {FomopaymentService} from '../payment/fomopayment.service';
import {EWalletService} from '../e-wallet.service';
import {AuthService} from '../../auth/auth.service';
import {AuthorizedPageBaseService} from '../../authorized-page-base.service';
import {WidgetUtilServiceService} from '../../widget-util-service.service';

@Component({
    selector: 'app-topup',
    templateUrl: './topup.page.html',
    styleUrls: ['./topup.page.scss'],
})
export class TopupPage extends AuthorizedPageBaseService implements OnInit {
    user: any = {name: 'Zou Xuan', balance: 0};

    constructor(private eWalletService: EWalletService, private authService: AuthService,
                private widgetUtilServiceService: WidgetUtilServiceService,
                private fomomaymentService: FomopaymentService) {
        super();
        authService.getUserName().then(userName => {
            this.user.name = userName;
            eWalletService.getTransactionHistoryByUserId(userName)
                .then(x => {
                    this.user.balance = x.balance;
                });
        });
    }

    ngOnInit() {
    }

    async topup(form) {
        let topupBo = new FomoBo();
        topupBo.amount = form.value.amount;
        topupBo.description = form.value.description;
        topupBo = this.fomomaymentService.processFomoPayment(topupBo);
        const topUpResult = await this.fomomaymentService.saveTopUpTransaction(topupBo);

        if (topUpResult.transactionId) {
            topupBo.signature = await this.fomomaymentService.generateSignature(topupBo);
            const html = this.fomomaymentService.postFomo(topupBo);
            document.write(html);
        } else {
            console.log(topUpResult);
            this.widgetUtilServiceService.presentToast('Ops!!There are some error occurred, please contact administrator');
        }

    }


}
