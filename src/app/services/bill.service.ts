import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  postOrder(formData: any): Observable<any> {
    const token = this.cookieService.get('token');
    let userId: string | null = null;

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        userId = decodedToken.id; // Assuming userId is stored in the token
        console.log('userId:', userId);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.log('Token not found in cookie.');
    }
    const products: any[] = JSON.parse(localStorage.getItem('cart')) || [];

    const orderData = {
      formData,
      userId,
      products: products.map((product) => ({
        productId: product.productId,
        quanities: product.quanities,
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
