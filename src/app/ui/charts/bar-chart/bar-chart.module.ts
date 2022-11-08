import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { BarChartComponent } from './bar-chart.component';

@NgModule({
  declarations: [BarChartComponent],
  exports: [BarChartComponent],
  imports: [CommonModule, NgChartsModule],
})
export class BarChartModule {}
