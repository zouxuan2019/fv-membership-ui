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
    constructor(private eWalletService: EWalletService, private authService: AuthService,
                private widgetUtilServiceService: WidgetUtilServiceService) {
        super();
    }

    user: any = {name: 'Zou Xuan', balance: 100};

    ngOnInit() {
    }

    async topup(form) {
        console.log(form.value);
        const topupBo = new FomoBo();
        topupBo.amount = form.value.amount;
        topupBo.description = form.value.description;
        const fomopaymentService = new FomopaymentService(topupBo, this.eWalletService, this.authService);
        const topUpResult = await fomopaymentService.saveTopUpTransaction();

        if (topUpResult.transactionId) {
            fomopaymentService.processFomoPayment();
            const html = fomopaymentService.postFomo();
            document.write(html);
        } else {
            console.log(topUpResult);
            this.widgetUtilServiceService.presentToast('Ops!!There are some error occurred, please contact administrator');
        }

    }


}
