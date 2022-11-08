import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersService } from '../../shared/services/orders.service';
import { ButtonModule } from '../../ui/button/button.module';
import { InputModule } from '../../ui/form-builder/input/input.module';
import { TableModule } from '../../ui/table/table.module';
import { OrdersRoutingModule } from './orders-routing.module';

import { OrdersComponent } from './orders.component';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersComponent],
      imports: [
        CommonModule,
        OrdersRoutingModule,
        TableModule,
        FlexLayoutModule,
        InputModule,
        ButtonModule,
        ReactiveFormsModule,
        HttpClientModule,
        NoopAnimationsModule,
      ],
      providers: [OrdersService],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
