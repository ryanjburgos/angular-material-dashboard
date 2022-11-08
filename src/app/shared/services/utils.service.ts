import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  public formatNumber(value: number, locale: string = 'en-US'): string {
    return Intl.NumberFormat(locale).format(value);
  }

  public formatNumberCurrency(value: number, locale: string = 'en-US', currency: string = 'USD'): string {
    return Intl.NumberFormat(locale, { style: 'currency', currency: currency, maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(value);
  }

  public formatDate(date: string | Date, locale: string = 'en-US'): string {
    return Intl.DateTimeFormat(locale).format(new Date(date));
  }
}
