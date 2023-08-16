import { Injectable } from '@angular/core';
import { Cart } from '../models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/productModal';
import { CartItem } from '../models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() {}

  //Add to cart //

  addToCart(product: Product): void {
    let cartItem = this.cart.items.find(
      (item) => item.product.id == product.id
    );
    if (cartItem) return;

    this.cart.items.push(new CartItem(product));
    this.setCartToLocalStorage();
  }

  //Remove from cart //

  removeFromCart(productId: string): void {
    this.cart.items = this.cart.items.filter(
      (item) => item.product.id != productId
    );
    this.setCartToLocalStorage();
  }

  changeQuantity(productId: string, quantity: number) {
    let cartItem = this.cart.items.find((item) => item.product.id == productId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.product.price;
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  //Set to localstorage

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.price,
      0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.quantity,
      0
    );
    const cartJson = JSON.stringify(this.cart);
    sessionStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  //Get from localstorage

  private getCartFromLocalStorage(): Cart {
    const cartJson = sessionStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
