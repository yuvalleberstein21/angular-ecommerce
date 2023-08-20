import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [SocialLoginModule, SocialAuthService],
})
export class LoginPageComponent {
  user: any;
  loggedIn: any;
  LoginForm: FormGroup | any;
  errorMessage!: string;
  userIsAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  userName: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private socialService: SocialAuthService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // this.socialService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = user != null;
    //   if (user) {
    //     sessionStorage.setItem('user', JSON.stringify(user));
    //     this.userIsAuthenticated.next(true); // Notify authentication state change
    //     this.userName.next(user.name); // Update user name
    //     this.router.navigate(['/']);
    //   }
    // });

    //form
    this.LoginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  Login() {
    this.LoginForm.value;
    this.authService.login(this.LoginForm.value).subscribe((res) => {
      console.log(res);
      if (res.message) {
        this.errorMessage = res.message;
        return;
      }
      this.userIsAuthenticated.next(true);
      this.userName.next(res.data[0].name);
      console.log(res.data[0].name);
      sessionStorage.setItem('user', JSON.stringify(res.data[0]));
      this.router.navigate(['/']);
    });
  }
}
