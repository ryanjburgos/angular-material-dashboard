import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { CookieModule } from 'ngx-cookie';

import { ApiInterceptor } from './api.interceptor';
import { InterceptorModule } from './interceptor.module';

describe('ApiInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [BrowserModule, HttpClientModule, CookieModule.withOptions(), InterceptorModule],
      providers: [ApiInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: ApiInterceptor = TestBed.inject(ApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
