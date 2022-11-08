import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiInterceptor } from './api.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }],
})
export class InterceptorModule {}
