import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public cartItems: number = 0;
  userIsAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  userName: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.products().subscribe((res) => {
      this.cartItems = res.length;
    });

    const isAuthenticated = JSON.parse(localStorage.getItem('user') || 'false');
    if (isAuthenticated) {
      this.userIsAuthenticated.next(true);
      this.userName.next(isAuthenticated.name);
    }
  }
}
