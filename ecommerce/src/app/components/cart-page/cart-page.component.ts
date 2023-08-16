import { Component, OnInit, Renderer2 } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Product } from '../../shared/models/productModal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public addressForm = false;
  public counter: any | number = 1;
  myForm: FormGroup | any;

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    this.renderer.setProperty(document.body, 'scrollTop', 0);
    this.cartService.getCartObservable().subscribe((res) => {
      this.showProduct = res.items;
      console.log(this.showProduct);

      this.totalAmout = this.cartService.getCart().totalPrice;
    });

    //form
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }

  deleteItem(item: CartItem) {
    this.cartService.removeFromCart(item.product.id);
  }

  // emptyCart() {
  //   this.apiService.removeAllItems();
  // }

  cancel() {
    this.addressForm = false;
    this.myForm.reset();
  }

  onSubmit() {
    this.myForm.value;
    console.log(this.myForm.value);
    this.myForm.reset();
  }
}
