import { ProductModel } from './product.model';

export interface OrdersResponseModel {
  orders: OrderModel[];
  page: number;
  total: number;
}

export interface OrderModel {
  created_at: Date;
  currency: string;
  customer: CustomerModel;
  id: string;
  product: ProductModel;
  status: string;
  total: number;
}

export interface AddressModel {
  city: string;
  street: string;
  zipcode: string;
}

export interface CustomerModel {
  address: AddressModel;
  id: string;
  name: string;
  surname: string;
}
