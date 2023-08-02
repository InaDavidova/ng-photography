import { Injectable } from '@angular/core';
import { IPost, IPostResponse } from '../interfaces/photoData';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {}

  getPosts$(limit?: number): Observable<IPostResponse[]> {
    return this.httpClient.get<IPostResponse[]>(
      `${this.baseUrl}/posts${limit ? `?limit=${limit}` : ''}`
    );
  }

  getPostById$(id: string): Observable<IPost> {
    return this.httpClient.get<IPost>(`${this.baseUrl}/posts/${id}`);
  }

  addPost$(body: {
    title: string;
    location: string;
    description: string;
    image: string;
    owner: string;
  }): Observable<IPost> {
    return this.httpClient.post<IPost>(`${this.baseUrl}/posts`, body, {
      withCredentials: true,
    });
  }

  editPost$(body: {
    title: string;
    location: string;
    description: string;
    image: string;
  }, postId: string): Observable<IPost> {
    return this.httpClient.put<IPost>(`${this.baseUrl}/posts/${postId}`, body, {
      withCredentials: true,
    });
  }

  deletePost$(postId: string): Observable<IPost> {
    return this.httpClient.delete<IPost>(`${this.baseUrl}/posts/${postId}`, {
      withCredentials: true,
    });
  }

  likePost$(postId: string): Observable<IPost> {
    return this.httpClient.put<IPost>(
      `${this.baseUrl}/likes/${postId}`,
      {},
      {
        withCredentials: true,
      }
    );
  }
}
