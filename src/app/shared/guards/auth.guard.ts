import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { AppPathsEnum } from '../../app-paths.enum';
import { ACCESS_TOKEN, IS_LOGGED } from '../constants/auth.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router, private snackBarService: MatSnackBar) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const accessToken: string | undefined = this.cookieService.get(ACCESS_TOKEN);
    const isLoggedIn: boolean = this.cookieService.get(IS_LOGGED) === 'true';

    if (!accessToken && !isLoggedIn) {
      this.snackBarService.open('You are logged out, Please login!', '', {
        duration: 5000,
      });
      this.router.navigate([AppPathsEnum.LOGIN]);
      return false;
    }

    return true;
  }
}
