import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieModule } from 'ngx-cookie';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AppPathsEnum } from './app-paths.enum';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterceptorModule } from './shared/interceptors/interceptor.module';
import { AuthService } from './shared/services/auth.service';
import { HeaderModule } from './ui/header/header.module';
import { SideNavComponent } from './ui/side-nav/side-nav.component';
import { SideNavModule } from './ui/side-nav/side-nav.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        HttpClientModule,
        CookieModule.withOptions(),
        NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
        InterceptorModule,
        HeaderModule,
        SideNavModule,
        MatSnackBarModule,
      ],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Freddy's App'`, () => {
    expect(app.title).toEqual("Freddy's App");
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header span')?.textContent).toContain("Freddy's App");
  });

  it('should test onMenuClick method', () => {
    const component = fixture.componentInstance;
    component.sideNav = {
      drawer: {
        toggle: jest.fn,
      } as unknown as MatDrawer,
    } as SideNavComponent;
    jest.spyOn(component.sideNav.drawer, 'toggle').mockResolvedValue('open');
    component.onMenuClick();
    expect(component.sideNav.drawer.toggle).toHaveBeenCalled();
  });

  describe('should test onMenuItemClick', () => {
    let component: AppComponent;
    let authService: AuthService;
    let router: Router;
    let spinner: NgxSpinnerService;

    beforeEach(() => {
      authService = TestBed.inject(AuthService);
      router = TestBed.inject(Router);
      spinner = TestBed.inject(NgxSpinnerService);
      component = fixture.componentInstance;
      component.sideNav = {
        drawer: {
          toggle: jest.fn,
          close: jest.fn,
        } as unknown as MatDrawer,
      } as SideNavComponent;
    });

    it(`case route => ${AppPathsEnum.LOGIN}`, () => {
      jest.spyOn(component.sideNav.drawer, 'close').mockResolvedValue('close');
      jest.spyOn(authService, 'setIsLogged');
      jest.spyOn(spinner, 'show');
      jest.spyOn(router, 'navigate').mockReturnValue(Promise.resolve(true));

      component.onMenuItemClick(AppPathsEnum.LOGIN);
      expect(component.sideNav.drawer.close).toHaveBeenCalled();
      expect(authService.setIsLogged).toHaveBeenCalledWith(false);
      expect(spinner.show).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith([AppPathsEnum.LOGIN]);
    });

    it(`case route => ${AppPathsEnum.DASHBOARD}`, () => {
      jest.spyOn(router, 'navigate').mockReturnValue(Promise.resolve(true));

      component.onMenuItemClick(AppPathsEnum.DASHBOARD);
      expect(router.navigate).toHaveBeenCalledWith([AppPathsEnum.DASHBOARD]);
    });
  });
});
