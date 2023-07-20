import { Injectable } from '@angular/core';
import { IUser } from './interfaces/userData';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';
  private _currentUser = new BehaviorSubject<IUser|undefined>(undefined);

  currentUser$ = this._currentUser.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(map(user=>!!user));

  constructor(private httpClient: HttpClient) {}

  register$(userData: IUser): Observable<IUser | null> {
    return this.httpClient
      .post<IUser>(`${this.baseUrl}/register`, userData, {
        withCredentials: true,
        observe: 'response',
      })
      .pipe(map((response) => response.body));
  }

  login$(userData: IUser): Observable<IUser | null> {
    return this.httpClient
      .post<IUser>(`${this.baseUrl}/login`, userData, {
        withCredentials: true,
        observe: 'response',
      })
      .pipe(map((response) => response.body));
  }

  logout$(): Observable<void> {
    return this.httpClient.post<void>(
      `${this.baseUrl}/logout`, {}, { withCredentials: true } 
    );
  }

  handleLogin(newUser: IUser) {
    this._currentUser.next(newUser);
  }

  handleLogout() {
    this._currentUser.next(undefined);
  }
}
