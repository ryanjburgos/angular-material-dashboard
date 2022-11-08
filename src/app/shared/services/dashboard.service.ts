import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartData } from 'chart.js';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DashboardResponseModel, SalesDataModel } from '../models/dashboard.model';
import { UtilsService } from './utils.service';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient, private utilsService: UtilsService) {}

  public getDashboardInfo(): Observable<DashboardResponseModel> {
    return this.http.get<DashboardResponseModel>(`${environment.apiUrl}/dashboard`);
  }

  public salesDataToBarChartDataBar(data: SalesDataModel, isYearly: boolean = false): ChartData<'bar'> {
    const xAxis: Array<string> = Object.keys(data);
    const datasets: ChartData<'bar'>['datasets'] = [{ data: xAxis.map((x) => data[x].total), label: 'Total sales' }];

    return {
      labels: xAxis.map((x, index) => {
        if (index === 0) return isYearly ? 'This month' : 'Today';
        if (index === 1) return isYearly ? 'Last month' : 'Yesterday';
        return isYearly ? `Month ${x}` : `Day ${x}`;
      }),
      datasets: datasets,
    };
  }

  public getTodayDataDetails(data: SalesDataModel): string {
    return `${this.utilsService.formatNumberCurrency(data['1']?.total)} / ${this.utilsService.formatNumber(data['1']?.orders)} orders`;
  }

  public getLastWeekDataDetails(data: SalesDataModel): string {
    const keys = Object.keys(data);
    const lastWeekRevenue: number = keys.map((day) => data[day].total).reduce((prev, current) => prev + current);
    const lastWeekOrders: number = keys.map((day) => data[day].orders).reduce((prev, current) => prev + current);

    return `${this.utilsService.formatNumberCurrency(lastWeekRevenue)} / ${this.utilsService.formatNumber(lastWeekOrders)} orders`;
  }

  public getLastMonthDataDetails(data: SalesDataModel): string {
    return `${this.utilsService.formatNumberCurrency(data['2']?.total)} / ${this.utilsService.formatNumber(data['2']?.orders)} orders`;
  }
}
