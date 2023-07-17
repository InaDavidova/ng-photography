import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/userData';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { createHeaders } from './api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:3030/users';

  currentUser!: IUser;

  get isLogged() {
    return !!this.currentUser;
  }

  constructor(private httpClient: HttpClient) {}

  register$(userData: IUser): Observable<any> {
    return this.httpClient
      .post<IUser>(`${this.baseUrl}/register`, userData, createHeaders())
      .pipe(tap((user) => console.log('in the pipe', user))); //store the user data in local storage ot state management
  }

  login$(userData: IUser): Observable<IUser> {
    return this.httpClient
      .post<IUser>(`${this.baseUrl}/login`, userData, {
        withCredentials: true,
      })
      .pipe(tap((user) => (this.currentUser = user)));
  }
}
