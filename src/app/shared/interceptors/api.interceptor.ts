import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AppPathsEnum } from '../../app-paths.enum';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/auth.constants';
import { LoginResponseModel } from '../models/login.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private cookieService: CookieService, private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const access_token: string | undefined = this.cookieService.get(ACCESS_TOKEN);

    if (access_token) request = request.clone({ ...request, headers: new HttpHeaders({ Authorization: `Bearer ${access_token}` }) });

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && !request.url.includes('/login') && error.status === 401) {
          return this.handle401Error(request, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      if (this.cookieService.get(ACCESS_TOKEN) || this.cookieService.get(REFRESH_TOKEN)) {
        this.cookieService.remove(ACCESS_TOKEN);
        return this.authService.refreshToken().pipe(
          switchMap(({ access_token }: Pick<LoginResponseModel, 'access_token'>) => {
            this.cookieService.put(ACCESS_TOKEN, access_token);
            this.isRefreshing = false;
            request.clone({ ...request, headers: new HttpHeaders({ Authorization: `Bearer ${access_token}` }) });
            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;

            if ((error as HttpErrorResponse).status === 403) {
              this.cookieService.removeAll();
              this.router.navigate([AppPathsEnum.LOGIN]);
            }

            return throwError(() => error);
          })
        );
      }
    }

    return next.handle(request);
  }
}
