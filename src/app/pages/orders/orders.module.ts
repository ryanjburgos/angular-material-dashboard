import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersService } from '../../shared/services/orders.service';
import { ButtonModule } from '../../ui/button/button.module';
import { InputModule } from '../../ui/form-builder/input/input.module';
import { TableModule } from '../../ui/table/table.module';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';

@NgModule({
  declarations: [OrdersComponent],
  imports: [CommonModule, OrdersRoutingModule, TableModule, FlexLayoutModule, InputModule, ButtonModule, ReactiveFormsModule],
  providers: [OrdersService],
})
export class OrdersModule {}
