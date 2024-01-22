import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from '../environment';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  // GET ALL PRODUCT
  getAllProducts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/products`);
  }

  // GET DETAILS PRODUCT BY ID
  getProductById(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/products/details/${id}`);
  }

  // GET PRODUCT BY ID OF CATEGORY
  getProductsByCategory(categoryId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/products/${categoryId}`);
  }

  getAllCategory(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/category`);
  }
}
