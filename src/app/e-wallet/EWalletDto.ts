export class EWalletDto {
    Balance: number;
    UserId: string;
    DeductHistories: DeDuctDto[];
    TopUpHistories: TopUpDto[];

}

export class DeDuctDto {
    Amount: number;
    TransactionId: string;
    Product: string;
    Company: string;
    Comment: string;
    UserId: string;
    ActionDate: string;
}

export class TopUpDto {
    Amount: number;
    TransactionId: string;
    PaymentReferenceNo: string;
    PaymentMerchant: string;
    Status: string;
    ActionDate: string;
    UserId: string;
}

export class EWalletTopUpDeductionResponse {
    userId: string;
    balance: number;
    transactionId: string;
}
