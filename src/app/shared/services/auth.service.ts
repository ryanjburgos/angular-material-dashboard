import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IS_LOGGED, REFRESH_TOKEN } from '../constants/auth.constants';
import { LoginRequestModel, LoginResponseModel } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLogged$: BehaviorSubject<boolean> = new BehaviorSubject(this.cookieService.get(IS_LOGGED) == 'true');

  public get isLogged$(): Observable<boolean> {
    return this._isLogged$.asObservable();
  }

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  public login(request: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${environment.apiUrl}/login`, request);
  }

  public refreshToken(): Observable<Pick<LoginResponseModel, 'access_token'>> {
    return this.http.post<Pick<LoginResponseModel, 'access_token'>>(
      `${environment.apiUrl}/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${this.cookieService.get(REFRESH_TOKEN)}`,
        },
      }
    );
  }

  public setIsLogged(isLogged: boolean): void {
    this.cookieService.put(IS_LOGGED, isLogged.toString());
    this._isLogged$.next(isLogged);
    if (!isLogged) this.cookieService.removeAll();
  }
}
