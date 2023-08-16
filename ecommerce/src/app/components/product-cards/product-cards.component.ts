import { Component, Input } from '@angular/core';
import { Product } from '../../shared/models/productModal';
import { ApiService } from 'src/app/shared/services/api.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.scss'],
})
export class ProductCardsComponent {
  @Input() item!: Product;

  constructor(private cartService: CartService) {}

  addToCart(item: Product) {
    this.cartService.addToCart(item);
  }
}
