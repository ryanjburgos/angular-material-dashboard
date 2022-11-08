import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ChartData } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { BestsellerModel, DashboardResponseModel, SalesDataModel } from '../../shared/models/dashboard.model';
import { TableItemModel } from '../../shared/models/table-item.model';
import { DashboardService } from '../../shared/services/dashboard.service';
import { UtilsService } from '../../shared/services/utils.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public chartDataWeek!: ChartData<'bar'>;
  public chartDataYear!: ChartData<'bar'>;
  public periodLabel: string = '7 days';
  public isYearlyData: boolean = false;

  public todayCardDetails!: string;
  public lastWeekCardDetails!: string;
  public lastMonthCardDetails!: string;
  public bestSellers!: TableItemModel[];
  public displayedColumns: string[] = ['productName', 'price', 'unitsSold', 'revenue'];

  constructor(private dashboardService: DashboardService, private utilsService: UtilsService, private spinner: NgxSpinnerService) {
    this.loadDashboardInfo();
  }

  public ngOnInit(): void {}

  public onPeriodChange({ checked }: MatSlideToggleChange): void {
    this.isYearlyData = checked;
    this.periodLabel = checked ? '12 months' : '7 days';
  }

  private loadDashboardInfo(): void {
    this.spinner.show();
    this.dashboardService.getDashboardInfo().subscribe({
      next: ({ dashboard }: DashboardResponseModel) => {
        const { bestsellers, sales_over_time_week, sales_over_time_year } = dashboard;
        this.setCardDetails(sales_over_time_week, sales_over_time_year);
        this.createTableBestSellers(bestsellers);
        this.chartDataWeek = this.dashboardService.salesDataToBarChartDataBar(sales_over_time_week);
        this.chartDataYear = this.dashboardService.salesDataToBarChartDataBar(sales_over_time_year, true);
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
      },
    });
  }

  private setCardDetails(sales_over_time_week: SalesDataModel, sales_over_time_year: SalesDataModel) {
    this.todayCardDetails = this.dashboardService.getTodayDataDetails(sales_over_time_week);
    this.lastWeekCardDetails = this.dashboardService.getLastWeekDataDetails(sales_over_time_week);
    this.lastMonthCardDetails = this.dashboardService.getLastMonthDataDetails(sales_over_time_year);
  }

  private createTableBestSellers(bestsellers: BestsellerModel[]): void {
    this.bestSellers = bestsellers.map((bs) => ({
      productName: { label: 'Product Name', value: bs.product.name },
      price: { label: 'Price', value: this.utilsService.formatNumberCurrency(bs.revenue / bs.units) },
      unitsSold: { label: '# Units Sold', value: bs.units },
      revenue: { label: 'Revenue', value: bs.revenue },
    }));
  }
}
