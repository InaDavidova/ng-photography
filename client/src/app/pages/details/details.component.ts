import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { PostService } from 'src/app/core/post.service';
import { IUser } from 'src/app/interfaces/userData';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  post: any;
  currentUser: IUser | undefined;
  isLoading!: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    const id = this.activatedRoute.snapshot.params['id'];

    this.postService.getPostById$(id).subscribe((post) => {
      this.post = post;
      this.isLoading = false;
      console.log(this.post);
    });

    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }
}
