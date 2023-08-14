import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}

  public totalAmount: number = 0;

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/']);
      this.apiService.removeAllItems();
    }, 4000);

    //total amount
    this.totalAmount = this.apiService.calculatePrice();
  }
}
