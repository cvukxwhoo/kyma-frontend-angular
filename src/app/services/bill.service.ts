import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { ProductsComponent } from '../page/products/products.component';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpClient) {}

  postOrder(formData: any): Observable<any> {
    const userId: string | null = localStorage.getItem('userId');
    const products: any[] = JSON.parse(localStorage.getItem('cart')) || [];

    const orderData = {
      formData,
      userId,
      product: products.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
        title: product.title,
        price: product.price,
      })),
    };

    console.log('Request Payload:', orderData); // Log the payload

    return this.http.post(`${environment.apiUrl}/bill/submit`, orderData);
  }
}

// const userId = localStorage.getItem('userId');

// const headers = new HttpHeaders().set('User-ID', userId || '');

// const body = {
//   formData,
//   productIds,
// };

// const orderData = { formData, userId, productIds };
// return this.http.post(`${environment.apiUrl}/bill/submit`, body, {
//   headers,
// });
