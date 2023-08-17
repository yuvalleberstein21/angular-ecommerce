import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/productModal';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-all-products-page',
  templateUrl: './all-products-page.component.html',
  styleUrls: ['./all-products-page.component.scss'],
})
export class AllProductsPageComponent implements OnInit {
  public allProducts: Product[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProduct().subscribe((product) => {
      this.allProducts = product;
      console.log(this.allProducts);
    });
  }
}
