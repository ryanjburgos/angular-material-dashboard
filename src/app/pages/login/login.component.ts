import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, Subject, takeUntil } from 'rxjs';
import { AppPathsEnum } from '../../app-paths.enum';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../shared/constants/auth.constants';
import { LoginResponseModel } from '../../shared/models/login.model';
import { AuthService } from '../../shared/services/auth.service';

export interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup;

  private onDestroyObservable$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private snackBarService: MatSnackBar,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.redirectIfLoggedIn();
    this.createLoginForm();
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.onDestroyObservable$.next();
    this.onDestroyObservable$.complete();
  }

  public onLogin(): void {
    this.spinner.show();
    this.authService.login(this.loginForm.value).subscribe({
      next: ({ access_token, refresh_token }: LoginResponseModel) => {
        this.cookieService.put(ACCESS_TOKEN, access_token);
        this.cookieService.put(REFRESH_TOKEN, refresh_token);
        this.authService.setIsLogged(true);
        this.router.navigate([AppPathsEnum.DASHBOARD]);
        this.spinner.hide();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.snackBarService.open('Username or Password incorrect, Please retry!', 'Close', {
            duration: 5000,
          });
        }
        this.spinner.hide();
      },
    });
  }

  private createLoginForm(): void {
    this.loginForm = new FormGroup<LoginForm>({
      username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    });
  }

  private redirectIfLoggedIn(): void {
    this.authService.isLogged$
      .pipe(
        takeUntil(this.onDestroyObservable$),
        filter((isLogged) => isLogged)
      )
      .subscribe(() => {
        this.router.navigate([AppPathsEnum.DASHBOARD]);
      });
  }
}
