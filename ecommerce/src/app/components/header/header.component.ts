import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
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
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.cartService.getCartObservable().subscribe((res) => {
      this.cartQuantity = res.totalCount;
    });
  }

  ngOnInit(): void {
    const isAuthenticated = JSON.parse(
      sessionStorage.getItem('user') || 'false'
    );
    const passCheckout = sessionStorage.getItem('Cart');
    if (passCheckout) {
      const cartData = JSON.parse(passCheckout);
      if (cartData && cartData.items && cartData.items.length > 0) {
      }
    }

    if (isAuthenticated) {
      this.userIsAuthenticated.next(true);

      this.userName.next(isAuthenticated.name);
    }
  }

  logout() {
    this.authService.logout();
    this.userIsAuthenticated.next(false);
    this.cartQuantity = 0;
    sessionStorage.clear();
  }
}
