import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [SocialLoginModule, SocialAuthService],
})
export class LoginPageComponent {
  user: any;
  loggedIn: any;
  userIsAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  userName: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      if (user) {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.userIsAuthenticated.next(true); // Notify authentication state change
        this.userName.next(user.name); // Update user name
        this.router.navigate(['/']);
      }
    });
  }
}
