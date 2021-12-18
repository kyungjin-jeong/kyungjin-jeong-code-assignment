import { Transaction } from "./transaction";

export class TransactionPaging {
    content!: Transaction[];
    totalPages!: number;
    totalElements!: number;
    numberOfElements!: number;
    size!: number;
    number!: number;
}
