import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  register(user: User): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:5001/api/register',
      user
    );
  }

  login(user: User): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:5001/api/login`, user);
  }

  logout() {
    return this.httpClient.get(`http://localhost:5001/api/logout`);
  }

  public setToSessionStorage(user: User): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
  public getFromSessionStorage(user: string) {
    return sessionStorage.getItem(user);
  }
}
