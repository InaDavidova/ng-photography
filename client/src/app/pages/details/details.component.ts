import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { MessageNotificatorService } from 'src/app/core/message-notificator.service';
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
    private authService: AuthService,
    private router: Router,
    private messageNotificator: MessageNotificatorService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    const id = this.activatedRoute.snapshot.params['id'];

    this.postService.getPostById$(id).subscribe((post) => {
      this.post = post;
      this.isLoading = false;
    });

    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  handleDelete() {
    let result = confirm('Are you sure you want to delete this post?');

    if (result) {
      this.postService.deletePost$(this.post._id).subscribe({
        next: () => {
          this.router.navigate(['/catalog']);
          this.messageNotificator.notifyForMessage({
            text: 'Successfully deleted post!',
            type: 'success',
          });
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
    }
  }
}
