import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { Product } from '../product-view/productModal';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.products().subscribe((res) => {
      this.showProduct = res;
      this.totalAmout = this.apiService.calculatePrice();
    });

    //form
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }

  deleteItem(item: Product) {
    this.apiService.removeFromCart(item);
  }

  emptyCart() {
    this.apiService.removeAllItems();
  }

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
