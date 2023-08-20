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

  getOrder(user_id: number, order: Order): Observable<Order> {
    return this.http.post<Order>(
      `http://localhost:5001/api/saveAddress/${user_id}`,
      order
    );
  }
  getAddress(user_id: number): Observable<Order[]> {
    return this.http.get<Order[]>(
      `http://localhost:5001/api/getAddress/${user_id}`
    );
  }

  insertOrder(
    user_id: number,
    product_id: number,
    quantity: number
  ): Observable<any> {
    const data = { user_id, product_id, quantity }; // Create an object to send in the request body
    return this.http.post<any>('http://localhost:5001/api/insertOrder', data);
  }

  makePayment(stripeToken: any): Observable<any> {
    return this.http.post<any>(`http://localhost:5001/api/payment`, {
      token: stripeToken,
    });
  }
}
