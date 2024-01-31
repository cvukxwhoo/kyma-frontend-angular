import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from './cart.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private cartService: CartService
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
    const { token } = response;

    this.cookieService.set('token', token, 7);
  }

  logout(): void {
    // Remove token and userId from cookies
    this.cookieService.delete('token');
    this.cartService.removeLocalStorage();
  }

  isAuthenticated(): boolean {
    // Check if the user is authenticated based on the presence of the token in cookies
    return !!this.cookieService.get('token');
  }

  // getUserInfoFromToken(token: string) {
  //   try {
  //     const token = this.cookieService.get('token');
  //     const decodedToken: any = jwtDecode(token);
  //     console.log(decodedToken);
  //     return decodedToken;
  //   } catch (error) {
  //     console.error('Error decoding token:', error);
  //     return null;
  //   }
  // }

  getToken(): string | null {
    return this.cookieService.get('token');
  }

  // Method to decode the token and return user information
  getUserInfoFromToken(): any {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  // New method to decode the token and return email
  getIdFromToken(): string | null {
    const userInfo = this.getUserInfoFromToken();
    console.log('userInfo"', userInfo);
    return userInfo ? userInfo.id : null;
  }
}
