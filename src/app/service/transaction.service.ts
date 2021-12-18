import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Transaction } from '../model/transaction';
import { Observable } from 'rxjs';
import { TransactionPaging } from '../model/transactionPaging';

@Injectable()
export class TransactionService {

  private baseUrl: string = 'http://localhost:8080/api/transaction';
  private findAllUrl: string;
  private findAllByStartDateAndEndDateUrl: string;
  private updateCommentsByIdUrl: string;
  
  constructor(private http: HttpClient) {
    this.findAllUrl = this.baseUrl + '/findAll';
    this.findAllByStartDateAndEndDateUrl = this.baseUrl + '/findAllByStartDateAndEndDate';
    this.updateCommentsByIdUrl = this.baseUrl + '/updateCommentsById';
  }

  public findAll(page_number: number): Observable<TransactionPaging> {
    const params = new HttpParams().set('page_number', page_number);
    return this.http.get<TransactionPaging>(this.findAllUrl, {params});
  }
  public findAllByStartDateAndEndDate(page_number: number, startDate: string, endDate: string): Observable<TransactionPaging> {
    const params = 
      new HttpParams()
      .set('page_number', page_number)
      .set('startDate', startDate).set('endDate', endDate);

    return this.http.get<TransactionPaging>(this.findAllByStartDateAndEndDateUrl, {params});
  }

  public updateCommentsById(id: String, comments: String) {
    return this.http.put<Transaction>(this.updateCommentsByIdUrl, {id: id, comments: comments});
  }
}