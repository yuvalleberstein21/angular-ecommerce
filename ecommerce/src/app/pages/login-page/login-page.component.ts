import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
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

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
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
    this.authService.login(this.LoginForm.value).subscribe((res) => {
      if (res.message) {
        this.errorMessage = res.message;
        return;
      }
      this.userIsAuthenticated.next(true);
      this.userName.next(res.data[0].name);
      this.authService.setToSessionStorage(res.data[0]);
      this.router.navigate(['/']);
    });
  }
}
