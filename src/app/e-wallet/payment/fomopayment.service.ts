import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {FomoBo} from '../topup/fomo-bo';
import uuid from 'uuid/v4';
import {sha256} from 'js-sha256';
import {EWalletService} from '../e-wallet.service';
import {EWalletTopUpDeductionResponse, TopUpDto} from '../EWalletDto';
import {AuthService} from '../../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class FomopaymentService {

    constructor(private fomoBo: FomoBo, private eWalletService: EWalletService, private authService: AuthService) {
        const host = this.getHost();
        const eWalletHost = environment.eWallet_Host;
        this.fomoBo = fomoBo;
        this.fomoBo.returnUrl = `${host}/return`;
        this.fomoBo.callbackUrl = `${eWalletHost}/api/Payment/callback`;
        this.fomoBo.transaction = 'abc'; // uuid();
        this.fomoBo.nonce = 'abc'; // uuid();
        this.fomoBo.type = 'sale';
        this.fomoBo.timeout = '1800';
        this.fomoBo.currencyCode = 'sgd';
        this.fomoBo.merchant = 'test';
        console.log(this.fomoBo.returnUrl);
    }

    private getHost(): string {
        const port = location.port ? `:${location.port}` : '';
        return `${location.protocol}//${location.hostname}${port}`;
    }

    public processFomoPayment() {
        this.fomoBo.url = environment.fomo_Url;
        this.fomoBo.merchant = environment.fomo_Merchant;
        this.fomoBo.apiKey = environment.fomo_ApiKey;
        this.fomoBo.signature = this.generateSignature();
    }

    private generateSignature(): string {
        const queryString = `callback_url=${this.fomoBo.callbackUrl}&currency_code=${this.fomoBo.currencyCode}&description=${this.fomoBo.description}&merchant=${this.fomoBo.merchant}&nonce=${this.fomoBo.nonce}&price=${this.fomoBo.amount}&return_url=${this.fomoBo.returnUrl}&timeout=${this.fomoBo.timeout}&transaction=${this.fomoBo.transaction}&type=${this.fomoBo.type}&shared_key=${this.fomoBo.apiKey}`;
        console.log(queryString);
        const hash = sha256(queryString).toLowerCase();
        console.log('hash:' + hash);
        return hash;
    }

    public async saveTopUpTransaction(): Promise<EWalletTopUpDeductionResponse> {
        const request = new TopUpDto();
        request.actionDate = this.eWalletService.getCurrentDate();
        request.amount = this.fomoBo.amount;
        request.paymentMerchant = this.fomoBo.merchant;
        request.status = 'Init';
        const userName = await this.authService.getUserName();
        request.userId = userName;
        window.sessionStorage.setItem('transactionId', this.fomoBo.transaction);
        request.transactionId = this.fomoBo.transaction;
        return this.eWalletService.saveTopUpTransaction(request).toPromise();
    }

    public postFomo(): string {
        const html = `<html>
        <body>
        <form name='fomopay' action='${this.fomoBo.url}' method='post'>
        <input type=hidden name='merchant' value='${this.fomoBo.merchant}'>
        <input type=hidden name='price' value='${this.fomoBo.amount}'>
        <input type=hidden name='description' value='${this.fomoBo.description}'>
        <input type=hidden name='transaction' value='${this.fomoBo.transaction}'>
        <input type=hidden name='return_url' value='${this.fomoBo.returnUrl}'>
        <input type=hidden name='callback_url' value='${this.fomoBo.callbackUrl}'>
        <input type=hidden name='currency_code' value='${this.fomoBo.currencyCode}'>
        <input type=hidden name='type' value='${this.fomoBo.type}'>
        <input type=hidden name='timeout' value='${this.fomoBo.timeout}'>
        <input type=hidden name='nonce' value='${this.fomoBo.nonce}'>
        <input type=hidden name='signature' value='${this.fomoBo.signature}'>
        <span>Redirecting to payment gateway....</span>
        </form>
        </body>
         <script type="text/javascript">document.fomopay.submit();</script>
        </html>
        `;
        return html;
    }
}
