import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/productModal';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {}

  public getProduct() {
    return this.http.get<Product[]>('http://localhost:5001/api/getAllProducts');
  }

  public getProductById(id: string) {
    return this.http.get<Product>(`http://localhost:5001/api/getProduct/${id}`);
  }

  public getProductCategories() {
    return this.http.get<Product[]>(
      'http://localhost:5001/api/getProductCategories'
    );
  }
}
