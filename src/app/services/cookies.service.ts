import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  private userIdSubject: BehaviorSubject<string | null>;

  constructor() {
    this.userIdSubject = new BehaviorSubject<string | null>(this.getUserId());
  }
  setToken(token: string, expirationDays: number): void {
    const date = new Date();
    // calculates the expiration time in milliseconds by adding the specified number of days to the current time.
    date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000); // Set expiration time in milliseconds
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `myToken=${token}; ${expires};SameSite=None;Secure; HttpOnly" ;path=/`;
  }

  setUserId(userId: string, expirationDays: number): void {
    const date = new Date();
    date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `userId=${userId}; ${expires};SameSite=None;Secure; HttpOnly; path=/`;

    this.userIdSubject.next(userId); // Update the subject
  }

  // Get the value of the token from the cookie
  getToken(): string | null {
    const name = 'myToken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }

    return null;
  }

  getUserId(): string | null {
    const name = 'userId=';
    const userId = this.getCookieValue(name);
    console.log('Retrieved userId from cookies:', userId);
    return userId;
  }

  getUserIdObservable(): Observable<string | null> {
    return this.userIdSubject.asObservable();
  }

  private getCookieValue(cookieName: string): string | null {
    const name = `${cookieName}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length); // Return the substring without length argument
      }
    }

    return null;
  }

  removeCookie(myToken: string, userId: string): void {
    document.cookie =
      myToken + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    document.cookie =
      userId + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}
