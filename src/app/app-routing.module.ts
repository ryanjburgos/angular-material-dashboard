import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPathsEnum } from './app-paths.enum';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppPathsEnum.LOGIN,
  },
  {
    path: AppPathsEnum.LOGIN,
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: AppPathsEnum.DASHBOARD,
    loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: AppPathsEnum.ORDERS,
    loadChildren: () => import('./pages/orders/orders.module').then((m) => m.OrdersModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
