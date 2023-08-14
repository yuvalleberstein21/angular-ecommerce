import { Component, Input } from '@angular/core';
import { Product } from '../product-view/productModal';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.scss'],
})
export class ProductCardsComponent {
  @Input() item!: Product;

  constructor(private apiService: ApiService) {}

  addToCart(item: Product) {
    this.apiService.addToCart(item);
  }
}
