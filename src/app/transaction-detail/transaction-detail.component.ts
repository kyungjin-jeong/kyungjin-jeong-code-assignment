import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Transaction } from '../model/transaction';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.scss'],
  providers: [DatePipe]
})
export class TransactionDetailComponent implements OnChanges {
  @Input() childTransaction!: Transaction;
  @Output() initParentTransaction = new EventEmitter<Transaction>();
  @Output() updateParentList = new EventEmitter<Transaction>();    

  transactionForm = this.formBuilder.group({
    id: '',
    date: '',
    sender: '',
    recipient: '',
    amount: '',    
    comments: '',
    status: ''
  });

  get comments() { return this.transactionForm.get('comments'); }

  constructor(
    private route: ActivatedRoute, private router: Router, 
    private transactionService: TransactionService, private formBuilder: FormBuilder, private datePipe: DatePipe
    ) {
    }

  onSubmit() {
    this.transactionService
      .updateCommentsById(this.transactionForm.value.id, this.transactionForm.value.comments)
      .subscribe(result => 
        this.updateParentList.emit(result) 
      );

    this.backToList();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes ', changes);
    console.log('changes ', changes['childTransaction']);

    if(changes['childTransaction'].currentValue !== undefined) {
      this.transactionForm = this.formBuilder.group({
        id: changes['childTransaction'].currentValue.id,
        date: this.datePipe.transform(changes['childTransaction'].currentValue.date, 'dd/MM/yyyy'),
        sender: changes['childTransaction'].currentValue.sender.firstName + ' ' + changes['childTransaction'].currentValue.sender.lastName,
        recipient: changes['childTransaction'].currentValue.recipient.firstName + ' ' + changes['childTransaction'].currentValue.recipient.lastName,
        amount: changes['childTransaction'].currentValue.amount + ' ' + changes['childTransaction'].currentValue.currencyCd,        
        comments: new FormControl(changes['childTransaction'].currentValue.comments, [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9 !@#$%^&*()-_`~\"\'\n]*$')
        ]),
        status: changes['childTransaction'].currentValue.status
      });
    }
  }

  backToList() {    
    this.initParentTransaction.emit();
  }
}

