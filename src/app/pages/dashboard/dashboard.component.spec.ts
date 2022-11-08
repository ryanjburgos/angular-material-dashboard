import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgChartsModule } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { of, throwError } from 'rxjs';
import { DashboardResponseModel, SalesDataModel } from '../../shared/models/dashboard.model';
import { DashboardService } from '../../shared/services/dashboard.service';
import { UtilsService } from '../../shared/services/utils.service';
import { CardDetailsModule } from '../../ui/card-details/card-details.module';
import { BarChartModule } from '../../ui/charts/bar-chart/bar-chart.module';
import { TableModule } from '../../ui/table/table.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let spinner: NgxSpinnerService;
  let dashboardService: DashboardService;
  let utilsService: UtilsService;

  const dashboardResponseMock: DashboardResponseModel = {
    dashboard: {
      bestsellers: [
        {
          product: { name: 'test' },
        },
      ],
      sales_over_time_week: { '1': { orders: 1, total: 200 }, '2': { orders: 2, total: 4200 } } as SalesDataModel,
      sales_over_time_year: { '1': { orders: 1, total: 200 }, '2': { orders: 2, total: 4200 } } as SalesDataModel,
    },
  } as DashboardResponseModel;

  const errorMock = { error: 'test' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
        HttpClientModule,
      ],
      providers: [DashboardService],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    spinner = TestBed.inject(NgxSpinnerService);
    dashboardService = TestBed.inject(DashboardService);
    utilsService = TestBed.inject(UtilsService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should test onPeriodChange', () => {
    it('case checked: true', () => {
      jest.spyOn(component, 'onPeriodChange');
      component.onPeriodChange({ checked: true } as MatSlideToggleChange);
      expect(component.isYearlyData).toEqual(true);
      expect(component.periodLabel).toEqual('12 months');
      expect(component.onPeriodChange).toHaveBeenCalled();
    });

    it('case checked: false', () => {
      jest.spyOn(component, 'onPeriodChange');
      component.onPeriodChange({ checked: false } as MatSlideToggleChange);
      expect(component.isYearlyData).toEqual(false);
      expect(component.periodLabel).toEqual('7 days');
      expect(component.onPeriodChange).toHaveBeenCalled();
    });
  });

  describe('should test loadDashboardInfo', () => {
    it('success case', (done) => {
      jest.spyOn(spinner, 'show');
      jest.spyOn(spinner, 'hide');
      jest.spyOn<DashboardComponent, any>(component, 'setCardDetails');
      jest.spyOn<DashboardComponent, any>(component, 'createTableBestSellers');
      jest.spyOn(dashboardService, 'getDashboardInfo').mockImplementation(() => of(dashboardResponseMock));
      jest.spyOn(dashboardService, 'salesDataToBarChartDataBar');

      component['loadDashboardInfo']();
      expect(spinner.show).toHaveBeenCalled();

      component['dashboardService'].getDashboardInfo().subscribe((response) => {
        expect(response).toEqual(dashboardResponseMock);
        expect(component['setCardDetails']).toHaveBeenCalledWith(
          dashboardResponseMock.dashboard.sales_over_time_week,
          dashboardResponseMock.dashboard.sales_over_time_year
        );
        expect(component['createTableBestSellers']).toHaveBeenCalledWith(dashboardResponseMock.dashboard.bestsellers);
        expect(dashboardService.salesDataToBarChartDataBar).toHaveBeenCalledTimes(2);
        expect(spinner.hide).toHaveBeenCalled();
        done();
      });
    });

    it('error case', (done) => {
      jest.spyOn(spinner, 'show');
      jest.spyOn(spinner, 'hide');

      jest.spyOn(dashboardService, 'getDashboardInfo').mockImplementation(() => throwError(() => errorMock));
      component['loadDashboardInfo']();
      expect(spinner.show).toHaveBeenCalled();

      component['dashboardService'].getDashboardInfo().subscribe({
        error: (error) => {
          expect(error).toEqual(errorMock);
          expect(spinner.hide).toHaveBeenCalled();
          done();
        },
      });
    });
  });

  it('should test setCardDetails', () => {
    jest.spyOn(dashboardService, 'getTodayDataDetails');
    jest.spyOn(dashboardService, 'getLastWeekDataDetails');
    jest.spyOn(dashboardService, 'getLastMonthDataDetails');
    component['setCardDetails'](dashboardResponseMock.dashboard.sales_over_time_week, dashboardResponseMock.dashboard.sales_over_time_year);

    expect(dashboardService.getTodayDataDetails).toHaveBeenCalledWith(dashboardResponseMock.dashboard.sales_over_time_week);
    expect(dashboardService.getLastWeekDataDetails).toHaveBeenCalledWith(dashboardResponseMock.dashboard.sales_over_time_week);
    expect(dashboardService.getLastMonthDataDetails).toHaveBeenCalledWith(dashboardResponseMock.dashboard.sales_over_time_year);
    expect(component.todayCardDetails).toEqual(
      `${utilsService.formatNumberCurrency(dashboardResponseMock.dashboard.sales_over_time_week['1']?.total)} / ${utilsService.formatNumber(
        dashboardResponseMock.dashboard.sales_over_time_week['1']?.orders
      )} orders`
    );

    expect(component.lastWeekCardDetails).toEqual(`${utilsService.formatNumberCurrency(4400)} / ${utilsService.formatNumber(3)} orders`);
    expect(component.lastMonthCardDetails).toEqual(
      `${utilsService.formatNumberCurrency(dashboardResponseMock.dashboard.sales_over_time_year['2']?.total)} / ${utilsService.formatNumber(
        dashboardResponseMock.dashboard.sales_over_time_year['2']?.orders
      )} orders`
    );
  });
});
