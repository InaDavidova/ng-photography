import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { PostService } from 'src/app/core/post.service';
import { IPostResponse } from 'src/app/interfaces/photoData';
import { IUser } from 'src/app/interfaces/userData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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
    this.postService.getPosts$(3).subscribe((postList) => {
      this.data = postList;
      this.isLoading = false;
    });
  }
}
