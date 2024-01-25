import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from '../environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cart';
  constructor(private http: HttpClient) {}

  addToCart(productId: string, quantity?: number): Observable<any> {
    const body = { productId, quantity };
    return this.http.post<any>(`${environment.apiUrl}/cart/create`, body);
  }

  updateLocalStorage(cartItems: any[]): void {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  getCartItemsFromLocalStorage(): any[] {
    const cartItemsJson = localStorage.getItem(this.cartKey);
    console.log('Cart Items from Local Storage:', cartItemsJson);

    if (!cartItemsJson) {
      return [];
    }

    try {
      return JSON.parse(cartItemsJson);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return [];
    }
  }
}
