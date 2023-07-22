import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/photoData';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {}

  addPost$(body: {title: string,location: string, description: string, image: string, likes: string[], ownerId: string}): Observable<IPost> {
    return this.httpClient.post<IPost>(`${this.baseUrl}/posts`, body, {
      withCredentials: true,
    });
  }
}
