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
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(data: any): Observable<any> {
    // return this.http.post(`${environment.apiUrl}/register`, data);
    return this.http.post(`${environment.apiUrl}/user/register`, data);
  }

  signIn(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/login`, data);
  }
}
