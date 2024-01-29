import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpClient) {}

  createBill(billData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/bill/submit`, billData);
  }
}
