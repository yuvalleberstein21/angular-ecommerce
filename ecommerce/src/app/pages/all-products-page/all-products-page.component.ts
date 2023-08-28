import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/shared/models/productModal';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-all-products-page',
  templateUrl: './all-products-page.component.html',
  styleUrls: ['./all-products-page.component.scss'],
})
export class AllProductsPageComponent implements OnInit {
  public allProducts: Product[] = [];
  productCategories!: Product[];
  filteredProducts: Product[] = [];
  showFilteredProducts: boolean = false;

  @ViewChild('search') search!: ElementRef;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProduct().subscribe((product) => {
      this.allProducts = product;
      this.showFilteredProducts = false;
    });
    this.apiService.getProductCategories().subscribe((productCategories) => {
      this.productCategories = productCategories;
    });
  }

  searchProduct() {
    this.filteredProducts = this.allProducts.filter((product) => {
      return product.title
        .toLowerCase()
        .includes(this.search.nativeElement.value.toLowerCase());
    });
    this.showFilteredProducts = true;
  }

  filterProductsByCategory(category: string) {
    this.filteredProducts = this.allProducts.filter((product) => {
      return product.category === category;
    });
    this.showFilteredProducts = true;
  }
  getAllProducts() {
    this.filteredProducts = this.allProducts;
  }
}
