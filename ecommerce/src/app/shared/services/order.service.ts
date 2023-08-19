import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public getCountriesList() {
    return this.http.get('https://trial.mobiscroll.com/content/countries.json');
  }

  public getOrder(user_id: number, order: Order): Observable<Order> {
    return this.http.post<Order>(
      `http://localhost:5001/api/saveAddress/${user_id}`,
      order
    );
  }
}
