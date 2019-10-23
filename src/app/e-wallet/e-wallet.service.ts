import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EWalletDto, EWalletTopUpDeductionResponse, TopUpDto} from './EWalletDto';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EWalletService {

    constructor(private httpClient: HttpClient) {
    }

    public saveTopUpTransaction(request: TopUpDto): Observable<EWalletTopUpDeductionResponse> {
        const url = `${environment.eWallet_Host}/api/EWallets/saveTopUp`;
        const header = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
        return this.saveTopUp(url, request, header);
    }

    private saveTopUp(url: string, body: any, header: {
        headers?: HttpHeaders | { [header: string]: string | string[]; };
    }): Observable<EWalletTopUpDeductionResponse> {
        console.log(url);
        const data = JSON.stringify(header).indexOf('application/json') > 0 ? JSON.stringify(body) : body.toString();
        return this.httpClient.post<EWalletTopUpDeductionResponse>(`${url}`, data, header);
    }

    public getTransactionHistoryByUserId(userId: string): Promise<EWalletDto> {
        const url = `${environment.eWallet_Host}/api/EWallets/user/${userId}`;
        const header = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
        return this.httpClient.get<EWalletDto>(`${url}`, header).toPromise();
    }

    public getTopUpByTransactionId(transactionId: string): Promise<TopUpDto[]> {
        const url = `${environment.eWallet_Host}/api/EWallets/transactionId/${transactionId}`;
        const header = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        };

        return this.httpClient.get<TopUpDto[]>(`${url}`, header).toPromise();
    }

    public getCurrentDate(): string {
        return new Date().toISOString().replace('T', ' ').substring(0, 19);
    }
}
