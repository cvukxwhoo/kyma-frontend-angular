import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { Observable, MonoTypeOperatorFunction } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookiesService } from './cookies.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private cookiesService: CookiesService
  ) {}
  signUp(email: string, password: string, fullName: string): Observable<any> {
    const body = { email, password, fullName };
    return this.http
      .post<any>(`${environment.apiUrl}/user/register`, body)
      .pipe(
        tap((response) => this.handleAuthentication(response)),
        catchError((error) => {
          console.error('Registration error:', error);
          throw error;
        })
      );
  }

  signIn(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${environment.apiUrl}/user/login`, body).pipe(
      tap((response) => this.handleAuthentication(response)),
      catchError((error) => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  private handleAuthentication(response: any): void {
    const { token, userId } = response;

    this.cookiesService.setToken(token, 30);

    this.cookiesService.setUserId(userId, 14);
  }

  logout(): void {
    // Remove token and userId from cookies
    this.cookiesService.removeCookie('myToken');
    this.cookiesService.removeUserId();
  }

  isAuthenticated(): boolean {
    // Check if the user is authenticated based on the presence of the token in cookies
    return !!this.cookiesService.getToken();
  }
}
