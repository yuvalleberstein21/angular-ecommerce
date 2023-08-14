import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../components/product-view/productModal';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {}

  public getProduct() {
    return this.http.get<Product[]>('https://dummyjson.com/products');
  }

  public getProductById(id: string) {
    return this.http.get<Product>(`https://dummyjson.com/products/${id}`);
  }

  public addToCart(data: Product) {
    const findProduct = this.cartItemList.find(
      (item: any) => item.id === data.id
    );

    if (findProduct) {
      findProduct.quantity++;
    } else {
      this.cartItemList.push(data);
      this.productList.next(this.cartItemList);
    }
  }

  products() {
    return this.productList.asObservable();
  }

  public removeFromCart(data: Product) {
    this.cartItemList.map((a: Product, index: Product) => {
      if (a.id === data.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }

  public calculatePrice() {
    let total = 0;
    this.cartItemList.map((a: any) => {
      total += a.price;
    });
    return total;
  }

  public removeAllItems() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
