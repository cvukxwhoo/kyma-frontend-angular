import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from '../environment';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  // GET ALl USER
  getAllUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user`);
  }

  // GET USER BY ID
  getUserById(userId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/id/${userId}`);
  }
}
