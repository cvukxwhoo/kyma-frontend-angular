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
export class CategoryService {
  constructor(private http: HttpClient) {}

  // GET ALL PRODUCT
  getAllCategory(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/category`);
  }

  getPathsByCategory(categoryName: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${categoryName}/paths`);
  }
}
