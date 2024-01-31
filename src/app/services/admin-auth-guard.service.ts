import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userIdDecode = this.authService.getIdFromToken();

    if (userIdDecode && userIdDecode === '65b8a59cfba1d7d2f998e8ea') {
      return true;
    } else {
      this.router.navigate(['**']);
      return false;
    }
  }
}
