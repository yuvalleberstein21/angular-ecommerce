import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GuardCheckoutService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const passCheckout = sessionStorage.getItem('Cart');

    if (passCheckout) {
      const cartData = JSON.parse(passCheckout);
      if (cartData && cartData.items && cartData.items.length) {
        return true;
      }
    }

    this.router.navigate(['/']); // Redirect to login page
    return false; // Block access to the route
  }
}
