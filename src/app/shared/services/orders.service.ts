import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class OrdersService {
  constructor(private http: HttpClient) {}

  public getOrdersBySearchTermAndPage(searchTerm: string, page: number = 1): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/orders`, {
      params: {
        page,
        ...(searchTerm ? { q: searchTerm } : {}),
      },
    });
  }
}
