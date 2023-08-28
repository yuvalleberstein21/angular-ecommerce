import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit {
  constructor(private router: Router, private cartService: CartService) {}

  public totalAmount: number = 0;

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/']);
      sessionStorage.removeItem('Cart');
      location.reload();
    }, 4000);
  }
}
