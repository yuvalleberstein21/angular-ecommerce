import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartQuantity = 0;
  userIsAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  userName: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {
    this.cartService.getCartObservable().subscribe((res) => {
      this.cartQuantity = res.totalCount;
    });
  }

  ngOnInit(): void {
    const isAuthenticated = JSON.parse(
      sessionStorage.getItem('user') || 'false'
    );
    if (isAuthenticated) {
      this.userIsAuthenticated.next(true);
      this.userName.next(isAuthenticated.name);
    }
  }
}
