import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgChartsModule } from 'ng2-charts';
import { DashboardService } from '../../shared/services/dashboard.service';
import { CardDetailsModule } from '../../ui/card-details/card-details.module';
import { BarChartModule } from '../../ui/charts/bar-chart/bar-chart.module';
import { TableModule } from '../../ui/table/table.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    BarChartModule,
    NgChartsModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    MatCardModule,
    CardDetailsModule,
    TableModule,
  ],
  providers: [DashboardService],
})
export class DashboardModule {}
