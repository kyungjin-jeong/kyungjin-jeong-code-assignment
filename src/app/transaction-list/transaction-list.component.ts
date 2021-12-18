import { Component, OnInit } from '@angular/core';
import { Transaction } from '../model/transaction';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TransactionService } from '../service/transaction.service';
import { TransactionPaging } from '../model/transactionPaging';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {
  parentTransaction!: Transaction;
  transactions!: Transaction[];
  transactionPaging!: TransactionPaging;
  
  transactionByDatesForm = this.formBuilder.group({
    startDate: new FormControl(null, Validators.required),
    endDate: new FormControl(null, Validators.required)
  });

  get startDate() { return this.transactionByDatesForm.get('startDate'); }
  get endDate() { return this.transactionByDatesForm.get('endDate'); }

  constructor(private transactionService: TransactionService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.handlePage(0);
  }

  setParentTransaction(transaction: Transaction) {
    this.parentTransaction = transaction;

    console.log('this.parentTransaction ', this.parentTransaction);
  }

  updateList(transaction: Transaction) {
    let update_item_index = this.transactions.findIndex(item => item.id == transaction.id);
    this.transactions[update_item_index] = transaction;
  }

  handlePage(page_number: number) {
    var startDate = this.transactionByDatesForm.value.startDate;
    var endDate = this.transactionByDatesForm.value.endDate;

    if(startDate != null && endDate != null) {
      this.transactionService.findAllByStartDateAndEndDate(page_number, startDate, endDate).subscribe(data => {
        this.transactions = data.content;
        this.transactionPaging = data;
      })
    } else {
      this.transactionService.findAll(page_number).subscribe(data => {
        this.transactions = data.content;
        this.transactionPaging = data;
      })
    }
  }

  onSubmit() {
    this.handlePage(0);
  }

  resetTransactions() {
    this.transactionByDatesForm.reset();
    this.handlePage(0);
  }
}
