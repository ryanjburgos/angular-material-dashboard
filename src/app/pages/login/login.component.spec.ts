import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { CookieModule, CookieService } from 'ngx-cookie';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { AppPathsEnum } from '../../app-paths.enum';
import { LoginResponseModel } from '../../shared/models/login.model';
import { AuthService } from '../../shared/services/auth.service';
import { ButtonModule } from '../../ui/button/button.module';
import { InputModule } from '../../ui/form-builder/input/input.module';
import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent, LoginForm } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let cookieService: CookieService;
  let snackBarService: MatSnackBar;
  let spinner: NgxSpinnerService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        CommonModule,
        NoopAnimationsModule,
        LoginRoutingModule,
        MatCardModule,
        InputModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        ButtonModule,
        MatSnackBarModule,
        HttpClientModule,
        CookieModule.withOptions(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    authService = TestBed.inject(AuthService);
    cookieService = TestBed.inject(CookieService);
    snackBarService = TestBed.inject(MatSnackBar);
    spinner = TestBed.inject(NgxSpinnerService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should test onLogin', () => {
    const loginMockResponse: LoginResponseModel = { access_token: 'test_access', refresh_token: 'test_refresh' };
    it('success case', (done): void => {
      jest.spyOn(cookieService, 'put');
      jest.spyOn(authService, 'setIsLogged');
      jest.spyOn(spinner, 'show');
      jest.spyOn(spinner, 'hide');
      jest.spyOn(authService, 'login').mockImplementation(() => of(loginMockResponse));
      jest.spyOn(router, 'navigate').mockReturnValue(Promise.resolve(true));

      component.onLogin();
      expect(spinner.show).toHaveBeenCalled();
      component['authService'].login({ username: 'TEST', password: 'TEST' }).subscribe((response) => {
        expect(response).toEqual(loginMockResponse);
        expect(cookieService.put).toHaveBeenCalledTimes(3);
        expect(authService.setIsLogged).toHaveBeenCalledWith(true);
        expect(spinner.hide).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith([AppPathsEnum.DASHBOARD]);
        done();
      });
    });

    it('error case', (done) => {
      jest.spyOn(snackBarService, 'open');
      jest.spyOn(spinner, 'show');
      jest.spyOn(spinner, 'hide');
      jest.spyOn(authService, 'login').mockImplementation(() => throwError(() => ({ status: 401 } as HttpErrorResponse)));
      component.onLogin();
      expect(spinner.show).toHaveBeenCalled();
      component['authService'].login({ username: 'TEST', password: 'TEST' }).subscribe({
        error: (error) => {
          expect(error.status).toEqual(401);
          expect(snackBarService.open).toHaveBeenCalledWith('Username or Password incorrect, Please retry!', 'Close', {
            duration: 5000,
          });
          expect(spinner.hide).toHaveBeenCalled();
          done();
        },
      });
    });
  });

  it('should test createLoginForm', () => {
    component['createLoginForm']();
    expect(component.loginForm).toBeInstanceOf(FormGroup<LoginForm>);
    expect(component.loginForm.value).toEqual({ username: '', password: '' });
    expect((component.loginForm as FormGroup<LoginForm>).controls.username.hasValidator(Validators.required)).toEqual(true);
    expect((component.loginForm as FormGroup<LoginForm>).controls.password.hasValidator(Validators.required)).toEqual(true);
  });

  it('should test redirectIfLoggedIn', (done) => {
    jest.spyOn(router, 'navigate').mockReturnValue(Promise.resolve(true));
    authService['_isLogged$'] = new BehaviorSubject(true);
    component['redirectIfLoggedIn']();
    component['authService'].isLogged$.subscribe((value) => {
      expect(value).toEqual(true);
      expect(router.navigate).toHaveBeenCalledWith([AppPathsEnum.DASHBOARD]);
      done();
    });
  });
});
