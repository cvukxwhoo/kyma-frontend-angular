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
    return this.http.get(`${environment.apiUrl}/product`);
  }

  getAllCategory(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/category`);
  }

  getProductsByCategory(categoryName: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/product/${categoryName}`);
  }

  getProductsByPath(pathName: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/product/path/${pathName}`);
  }

  // GET DETAILS PRODUCT BY ID
  getProductById(productId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/product/details/${productId}`);
  }

  // UPDATE PRODUCTS
  updateProduct(productId: string, formData: any): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/product/${productId}`,
      formData
    );
  }

  // DELETE PRODUCTS
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/product/${productId}`);
  }

  // ADD PRODUCT
  createProduct(formData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/product/create`, formData);
  }

  // Search Product
  searchProductsByName(query: string) {
    return this.http.get<any[]>(
      `${environment.apiUrl}/products/search?name=${query}`
    );
  }
}
