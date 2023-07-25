import { Component, Input } from '@angular/core';
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

  liked:boolean = false;

  constructor(private postService: PostService) {    
  }

  likeHandler() {
    console.log('liked');
    this.postService.likePost$(this.data._id).subscribe({
      next:()=>{
        this.liked = true;
      },
      error(err) {
        console.log(err);
        
      },
    })
  }
}
