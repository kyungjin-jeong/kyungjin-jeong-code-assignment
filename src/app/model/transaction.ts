export class Transaction {
    id!: string;
    date!: Date;
    sender!: {};
    recipient!: {};
    amount!: string;
    currencyCd!: string
    comments!: string;
    status!: string;
}
