import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpClient) {}

  postOrder(formData: any, userId: string, productIds: string[]) {
    const orderData = { formData, userId, productIds };
    return this.http.post(`${environment.apiUrl}/bill/submit`, orderData);
  }
}
