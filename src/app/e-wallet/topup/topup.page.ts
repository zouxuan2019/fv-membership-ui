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
                private widgetUtilServiceService: WidgetUtilServiceService,
                private fomomaymentService: FomopaymentService) {
        super();
    }

    user: any = {name: 'Zou Xuan', balance: 0};

    ngOnInit() {
    }

    async topup(form) {
        console.log(form.value);
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
