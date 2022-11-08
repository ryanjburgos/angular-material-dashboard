import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, distinctUntilChanged, exhaustMap, Subject, takeUntil, tap } from 'rxjs';
import { OrderModel, OrdersResponseModel } from '../../shared/models/order.model';
import { TableItemModel } from '../../shared/models/table-item.model';
import { OrdersService } from '../../shared/services/orders.service';
import { UtilsService } from '../../shared/services/utils.service';

interface SearchForm {
  searchTerm: FormControl<string>;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  public orders!: TableItemModel[];
  public displayedColumns: string[] = ['productName', 'date', 'price', 'status'];

  private currentPageIndex!: number;

  public searchForm: FormGroup<SearchForm> = new FormGroup<SearchForm>({
    searchTerm: new FormControl('', { nonNullable: true }),
  });

  private onDestroyObservable$: Subject<void> = new Subject();

  constructor(private ordersService: OrdersService, private utilsService: UtilsService, private spinner: NgxSpinnerService) {}

  public ngOnInit(): void {
    this.loadOrders();
    this.searchByTerm();
  }

  public ngOnDestroy(): void {
    this.onDestroyObservable$.next();
    this.onDestroyObservable$.complete();
  }

  private loadOrders(): void {
    this.spinner.show();
    this.ordersService.getOrdersBySearchTermAndPage('').subscribe({
      next: (response: OrdersResponseModel) => {
        this.currentPageIndex = response.page;
        this.createOrdersTable(response.orders);
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
      },
    });
  }

  private searchByTerm(): void {
    this.searchForm.controls.searchTerm.valueChanges
      .pipe(
        takeUntil(this.onDestroyObservable$),
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => this.spinner.show()),
        exhaustMap((text) => this.ordersService.getOrdersBySearchTermAndPage(text))
      )
      .subscribe({
        next: (response: OrdersResponseModel) => {
          this.currentPageIndex = response.page;
          this.createOrdersTable(response.orders);
          this.spinner.hide();
        },
        error: () => {
          this.spinner.hide();
        },
      });
  }

  private createOrdersTable(orders: OrderModel[]): void {
    this.orders = orders.map((order) => ({
      productName: {
        label: 'Product Name',
        value: order.product.name,
      },
      date: {
        label: 'Date',
        value: this.utilsService.formatDate(order.created_at),
      },
      price: {
        label: 'Price',
        value: this.utilsService.formatNumberCurrency(order.total),
      },
      status: {
        label: 'Status',
        value: order.status,
      },
    }));
  }
}
