import { Component, OnInit } from '@angular/core';
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
  success: boolean = false;
  failure: boolean = false;
  paymentHandler: any = null;
  finalProductId: number = 0;
  finalQty: number = 0;

  constructor(
    private orderService: OrderService,
    private cartService: CartService
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
      console.log(this.cart);

      this.totalAmout = this.cartService.getCart().totalPrice;
    });
    this.invokeStripe();
  }

  insertPaymentDB() {
    console.log(this.userId, '#USER ID');
    // console.log(this.cart[0].product, '#PRODUCT');

    for (let i = 0; i < this.cart.length; i++) {
      this.cart[i].product = this.cart[i].product;
      this.finalProductId = this.cart[i].product.id;
      this.cart[i].quantity = this.cart[i].quantity;
      this.finalQty = this.cart[i].quantity;

      this.orderService
        .insertOrder(this.userId, this.finalProductId, this.finalQty)
        .subscribe((response: any) => {
          console.log(response);
        });
    }
  }

  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51Nh66tLzupgPvagxiO5PKZQ8JKiO9lHWF2hHXrS712iRwY5cJcG1sx1biABBVBHbm0CiANxYeycOZJGBg68XoTn800cAuxAgdm',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log({ stripeToken });

        paymentStripe(stripeToken);
        alert('Stripe token generated!');
      },
    });

    const paymentStripe = (stripeToken: any) => {
      this.orderService.makePayment(stripeToken).subscribe((data: any) => {
        console.log(data);
        if (data.data === 'success') {
          this.success = true;
        } else {
          this.failure = true;
        }
      });
    };

    paymentHandler.open({
      name: 'FreakyJolly',
      description: 'Buying a Hot Coffee',
      amount: this.totalAmout * 100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51Nh66tLzupgPvagxiO5PKZQ8JKiO9lHWF2hHXrS712iRwY5cJcG1sx1biABBVBHbm0CiANxYeycOZJGBg68XoTn800cAuxAgdm',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
