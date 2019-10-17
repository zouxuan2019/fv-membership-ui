export class EWalletDto {
    balance: number;
    userId: string;
    deductHistories: DeDuctDto[];
    topUpHistories: TopUpDto[];

}

export class DeDuctDto {
    amount: number;
    transactionId: string;
    product: string;
    company: string;
    comment: string;
    userId: string;
    actionDate: string;
    status: string;
}

export class TopUpDto {
    amount: number;
    transactionId: string;
    paymentReferenceNo: string;
    paymentMerchant: string;
    status: string;
    actionDate: string;
    userId: string;
}

export class EWalletTopUpDeductionResponse {
    userId: string;
    balance: number;
    transactionId: string;
}
