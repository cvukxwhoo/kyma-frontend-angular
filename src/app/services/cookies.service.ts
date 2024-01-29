import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
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
    document.cookie = `userId=${userId}; ${expires};SameSite=None;Secure; HttpOnly" ;path=/`;
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
    return this.getCookieValue(name);
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

// setToken(token: string, expirationDays: number): void {
//   const date = new Date();
//   date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
//   const expires = `expires=${date.toUTCString()}`;
//   document.cookie = `myToken=${token}; ${expires};SameSite=None;Secure; HttpOnly" ;path=/`;
// }

// getToken(): string | null {
//   const name = 'myToken=';
//   return this.getCookieValue(name);
// }

// removeToken(): void {
//   this.removeCookie('myToken');
// }

// removeCookie(cookieName: string): void {
//   document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
// }
