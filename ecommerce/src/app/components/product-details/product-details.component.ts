import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { Product } from '../../shared/models/productModal';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productData!: Product[];
  showAdd: boolean = true;
  showRemove: boolean = false;
  filterSimilarProducts!: Product[];
  similarProducts!: Product[];
  isLoading: boolean = true;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    let productId = this.activatedRoute.snapshot.paramMap.get('productId');
    productId && this.getProductById(productId);
    this.renderer.setProperty(document.body, 'scrollTop', 0);
  }

  getProductById(productId: string) {
    this.apiService.getProductById(productId).subscribe((res: any) => {
      this.productData = res;
      this.getAllProducts();
      this.isLoading = false;
    });
  }

  getAllProducts() {
    this.apiService.getProduct().subscribe((res: any) => {
      this.filterSimilarProducts = res;
      const selectedCategory = this.productData[0].category;
      this.similarProducts = this.filterSimilarProducts.filter(
        (product) => product.category === selectedCategory
      );
      this.isLoading = false;
      return this.similarProducts;
    });
  }

  addToCart(productData: Product) {
    this.showAdd = false;
    this.showRemove = true;
    this.cartService.addToCart(productData);
  }

  removeItem(productData: Product) {
    this.showAdd = true;
    this.showRemove = false;
    this.cartService.removeFromCart(productData.id);
  }
}
