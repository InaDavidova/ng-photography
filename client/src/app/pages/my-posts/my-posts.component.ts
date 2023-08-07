import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { PostService } from 'src/app/core/post.service';
import { IPostResponse } from 'src/app/interfaces/photoData';
import { IUser } from 'src/app/interfaces/userData';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css'],
})
export class MyPostsComponent implements OnInit {
  likedPosts: IPostResponse[];
  userPosts: IPostResponse[];
  isUserPostsLoading: boolean;
  isUserLikedPostsLoading: boolean;
  currentUser: IUser | undefined;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isUserPostsLoading = true;
    this.isUserLikedPostsLoading = true;

    this.postService.getUserPosts$().subscribe((posts) => {
      this.isUserPostsLoading = false;
      this.userPosts = posts;
    });

    this.postService.getUserLikedPosts$().subscribe((posts) => {
      this.isUserLikedPostsLoading = false;
      this.likedPosts = posts;
    });

    this.authService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  unlikePost(id: string) {
    const index = this.likedPosts.findIndex((el) => el._id === id);
    this.likedPosts.splice(index, 1);
  }
}
