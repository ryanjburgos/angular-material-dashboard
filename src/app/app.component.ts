import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AppPathsEnum } from './app-paths.enum';
import { MENU_ITEMS } from './shared/constants/menu-item.constants';
import { MenuItemsModel } from './shared/models/menu-items.model';
import { AuthService } from './shared/services/auth.service';
import { SideNavComponent } from './ui/side-nav/side-nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(SideNavComponent) sideNav!: SideNavComponent;
  public title: string = "Freddy's App";
  public menuItems: MenuItemsModel[] = MENU_ITEMS;
  public isLogged$: Observable<boolean> = this.authService.isLogged$;

  constructor(private router: Router, private authService: AuthService, private spinner: NgxSpinnerService) {}

  public onMenuClick(): void {
    this.sideNav.drawer.toggle();
  }

  public onMenuItemClick(route: AppPathsEnum): void {
    if (route === AppPathsEnum.LOGIN) {
      this.sideNav.drawer.close();
      this.authService.setIsLogged(false);
      this.spinner.show();
    }

    this.router.navigate([route]).then(() => {
      if (route === AppPathsEnum.LOGIN) this.spinner.hide();
    });
  }
}
