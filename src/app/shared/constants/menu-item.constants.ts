import { AppPathsEnum } from '../../app-paths.enum';
import { MenuItemsModel } from '../models/menu-items.model';

export const MENU_ITEMS: MenuItemsModel[] = [
  { label: 'Dashboard', route: AppPathsEnum.DASHBOARD },
  { label: 'Orders', route: AppPathsEnum.ORDERS },
  { label: 'Logout', route: AppPathsEnum.LOGIN },
];
