import { ProductModel } from './product.model';

export interface BestsellerModel {
  product: ProductModel;
  revenue: number;
  units: number;
}

export interface SalesDataModel {
  [key: string]: SingleSaleDataModel;
}

export interface SingleSaleDataModel {
  orders: number;
  total: number;
}

export interface DashboardModel {
  bestsellers: BestsellerModel[];
  sales_over_time_week: SalesDataModel;
  sales_over_time_year: SalesDataModel;
}

export interface DashboardResponseModel {
  dashboard: DashboardModel;
}
