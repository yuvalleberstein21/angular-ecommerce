import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CartService } from 'src/app/shared/services/cart.service';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  showProduct: any = [];
  public totalAmout: number = 0;
  myForm: FormGroup | any;

  constructor(private cartService: CartService, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.renderer.setProperty(document.body, 'scrollTop', 0);
    this.cartService.getCartObservable().subscribe((res) => {
      this.showProduct = res.items;

      this.totalAmout = this.cartService.getCart().totalPrice;
    });
  }

  deleteItem(item: CartItem) {
    this.cartService.removeFromCart(item.product.id);
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.product.id, quantity);
  }

  onSubmit() {
    this.myForm.value;
    this.myForm.reset();
  }
}
