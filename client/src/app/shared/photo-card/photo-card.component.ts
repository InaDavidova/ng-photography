import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IPostResponse } from '../../interfaces/photoData';
import { IUser } from 'src/app/interfaces/userData';
import { PostService } from 'src/app/core/post.service';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.css'],
})
export class PhotoCardComponent {
  @Input('photoData') data!: IPostResponse;
  @Input('user') user!: IUser | undefined;
  @Output() unliked = new EventEmitter<string>();

  constructor(private postService: PostService) {}

  likeHandler() {
    this.postService.likePost$(this.data._id).subscribe({
      next: () => {
        this.data.likes.push(this.user?._id!);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  unlikeHandler() {
    this.postService.unlikePost$(this.data._id).subscribe({
      next: () => {
        const index = this.data.likes.indexOf(this.user?._id!);
        this.data.likes.splice(index, 1);
        this.unliked.emit(this.data._id);
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
