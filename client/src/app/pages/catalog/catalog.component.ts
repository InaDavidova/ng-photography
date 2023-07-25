import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { PostService } from 'src/app/core/post.service';
import { IPostResponse } from 'src/app/interfaces/photoData';
import { IUser } from 'src/app/interfaces/userData';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  data!: IPostResponse[];
  isLoading!: boolean;
  currentUser: IUser | undefined;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {
    this.authService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.postService.getPosts$().subscribe((postList) => {
      this.data = postList;
      this.isLoading = false;
      console.log(this.data);
      
    });
  }
}
