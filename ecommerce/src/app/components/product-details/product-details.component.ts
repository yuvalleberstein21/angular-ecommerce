import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { Product } from '../product-view/productModal';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productData!: Product;
  showAdd: boolean = true;
  showRemove: boolean = false;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let productId = this.activatedRoute.snapshot.paramMap.get('productId');
    productId &&
      this.apiService.getProductById(productId).subscribe((res) => {
        this.productData = res;
        console.log(this.productData);
      });
  }

  addToCart(productData: Product) {
    this.showAdd = false;
    this.showRemove = true;
    this.apiService.addToCart(productData);
  }

  removeItem(productData: Product) {
    this.showAdd = true;
    this.showRemove = false;
    this.apiService.removeFromCart(productData);
  }
}
