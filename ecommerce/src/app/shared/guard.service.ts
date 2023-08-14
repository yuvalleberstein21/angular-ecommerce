import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check your authentication logic here
    const isAuthenticated = localStorage.getItem('user');

    if (isAuthenticated) {
      return true; // Allow access to the route
    } else {
      this.router.navigate(['login-page']); // Redirect to login page
      return false; // Block access to the route
    }
  }
}
