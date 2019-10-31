import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {FomoBo} from '../topup/fomo-bo';
import uuid from 'uuid/v4';
import {EWalletService} from '../e-wallet.service';
import {EWalletTopUpDeductionResponse, TopUpDto} from '../EWalletDto';
import {AuthService} from '../../auth/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FomopaymentService {

    constructor(private eWalletService: EWalletService, private authService: AuthService, private httpClient: HttpClient) {
    }

    private getHost(): string {
        const port = location.port ? `:${location.port}` : '';
        return `${location.protocol}//${location.hostname}${port}`;
    }

    public processFomoPayment(fomoBo: FomoBo): FomoBo {
        const host = this.getHost();
        const eWalletHost = environment.eWallet_Host;
        fomoBo.returnUrl = `${host}/return`;
        fomoBo.callbackUrl = `${eWalletHost}/api/Payment/callback`;
        fomoBo.nonce = uuid();
        fomoBo.type = 'sale';
        fomoBo.timeout = '1800';
        fomoBo.currencyCode = 'sgd';
        fomoBo.merchant = 'test';
        fomoBo.transaction = uuid();
        fomoBo.url = environment.fomo_Url;
        return fomoBo;
    }


    public async generateSignature(fomoBo: FomoBo): Promise<string> {
        const url = `${environment.eWallet_Host}/api/Payment/signature`;
        const header = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
        const result = await this.httpClient.post<FomoBo>(url, fomoBo, header).toPromise();
        return result.signature;
    }

    public async saveTopUpTransaction(fomoBo: FomoBo): Promise<EWalletTopUpDeductionResponse> {
        const request = new TopUpDto();
        request.actionDate = this.eWalletService.getCurrentDate();
        request.amount = fomoBo.amount;
        request.paymentMerchant = fomoBo.merchant;
        request.status = 'Init';
        window.sessionStorage.setItem('transactionId', fomoBo.transaction);
        request.transactionId = fomoBo.transaction;
        return this.eWalletService.saveTopUpTransaction(request).toPromise();
    }

    public postFomo(fomoBo: FomoBo): string {
        const html = `<html>
        <body>
        <form name='fomopay' action='${fomoBo.url}' method='post'>
        <input type=hidden name='merchant' value='${fomoBo.merchant}'>
        <input type=hidden name='price' value='${fomoBo.amount}'>
        <input type=hidden name='description' value='${fomoBo.description}'>
        <input type=hidden name='transaction' value='${fomoBo.transaction}'>
        <input type=hidden name='return_url' value='${fomoBo.returnUrl}'>
        <input type=hidden name='callback_url' value='${fomoBo.callbackUrl}'>
        <input type=hidden name='currency_code' value='${fomoBo.currencyCode}'>
        <input type=hidden name='type' value='${fomoBo.type}'>
        <input type=hidden name='timeout' value='${fomoBo.timeout}'>
        <input type=hidden name='nonce' value='${fomoBo.nonce}'>
        <input type=hidden name='signature' value='${fomoBo.signature}'>
        <span>Redirecting to payment gateway....</span>
        </form>
        </body>
         <script type="text/javascript">document.fomopay.submit();</script>
        </html>
        `;
        return html;
    }
}
