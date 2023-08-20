import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/models/Order';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order-payment',
  templateUrl: './order-payment.component.html',
  styleUrls: ['./order-payment.component.scss'],
})
export class OrderPaymentComponent implements OnInit {
  userId!: number;
  userEmail!: string;
  order!: Order[];
  cart: any = [];
  public totalAmout: number = 0;
  finalProductId: number = 0;
  finalQty: number = 0;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.userEmail = user.email;
      if (user.id) {
        this.userId = user.id;
      }
    }
    this.orderService.getAddress(this.userId).subscribe((response: any) => {
      this.order = response;
    });

    this.cartService.getCartObservable().subscribe((res) => {
      this.cart = res.items;
      this.totalAmout = this.cartService.getCart().totalPrice;
    });
  }

  insertPaymentDB() {
    for (let i = 0; i < this.cart.length; i++) {
      this.cart[i].product = this.cart[i].product;
      this.finalProductId = this.cart[i].product.id;
      this.cart[i].quantity = this.cart[i].quantity;
      this.finalQty = this.cart[i].quantity;

      this.orderService
        .insertOrder(this.userId, this.finalProductId, this.finalQty)
        .subscribe((response: any) => {
          if (response.affectedRows > 0) {
            alert('Order Placed Successfully');
            sessionStorage.removeItem('Cart');
            this.router.navigate(['/']);
          }
        });
    }
  }
}
