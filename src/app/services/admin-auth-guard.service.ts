import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from 'src/app/services/user.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const userIdDecode = this.authService.getIdFromToken();
    return this.userService.getUserById(userIdDecode).pipe(
      map((res) => {
        const userRole = res.data.role;
        return userRole === 'admin'; // Return true if user is admin, false otherwise
      }),
      catchError((error) => {
        console.error('Error fetching user:', error);
        this.router.navigate(['**']);
        return of(false); // Return false if there's an error
      })
    );
  }
}
