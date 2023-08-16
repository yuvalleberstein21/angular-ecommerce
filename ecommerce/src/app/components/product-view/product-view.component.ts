import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Product } from '../../shared/models/productModal';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {
  data!: Product[] | any;
  filterProducts: any[] = [];
  isLoading: boolean = true;
  filteredCategories: string[] = [
    'smartphones',
    'laptops',
    'home-decoration',
    'skincare',
  ];

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.displayProduct();
  }

  displayProduct() {
    this.apiService.getProduct().subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.filterProducts = this.data.filter((product: Product) => {
        return this.filteredCategories.includes(product.category);
      });
      this.isLoading = false;
    });
  }

  get filteredSmartphones() {
    const smartphones = this.filterProducts.filter((product: Product) => {
      return product.category === 'smartphones';
    });
    return smartphones.slice(0, 4);
  }

  get filteredLaptops() {
    const laptops = this.filterProducts.filter((product: Product) => {
      return product.category === 'laptops';
    });
    return laptops.slice(0, 4);
  }

  get filteredHomeDecoration() {
    const homeDecoration = this.filterProducts.filter((product: Product) => {
      return product.category === 'home-decoration';
    });
    return homeDecoration.slice(0, 4);
  }
  get filteredSkincare() {
    const skincare = this.filterProducts.filter((product: Product) => {
      return product.category === 'skincare';
    });
    return skincare.slice(0, 4);
  }
  addToCart(item: Product) {
    this.cartService.addToCart(item);
  }
  removeItem(item: Product) {
    this.cartService.removeFromCart(item.id);
  }
}
