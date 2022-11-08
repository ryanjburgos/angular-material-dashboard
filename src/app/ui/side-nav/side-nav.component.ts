import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AppPathsEnum } from '../../app-paths.enum';
import { MenuItemsModel } from '../../shared/models/menu-items.model';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @ViewChild(MatDrawer) drawer!: MatDrawer;

  @Input() appLogo!: string;
  @Input() menuItems!: Array<MenuItemsModel>;

  @Output() menuItemClick$: EventEmitter<AppPathsEnum> = new EventEmitter<AppPathsEnum>();

  constructor() {}

  public ngOnInit(): void {}

  public onMenuItemClick(route: AppPathsEnum): void {
    this.menuItemClick$.emit(route);
  }
}
