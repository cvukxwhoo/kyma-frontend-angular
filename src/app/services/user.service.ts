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
export class UserService {
  constructor(private http: HttpClient) {}

  // // GET INFOR USER
  // getUserDetails(): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}/user`);
  // }

  // GET ALl USER
  getAllUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user`);
  }
}
