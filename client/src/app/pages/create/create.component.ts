import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { MessageNotificatorService } from 'src/app/core/message-notificator.service';
import { PostService } from 'src/app/core/post.service';
import { IUser } from 'src/app/interfaces/userData';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  currentUser:IUser|undefined;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private messageNotificator: MessageNotificatorService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((result)=>this.currentUser = result);

    console.log("currentUser",this.currentUser);

    // const result = this.postService
    //   .addPost$({
    //     title: 'as',
    //     description: 'as',
    //     location: 'BG',
    //     image: 'http//',
    //     likes: [],
    //     ownerId: this.currentUser?._id || "",
    //   })
    //   .subscribe({
    //     next: () => {
    //       // this.router.navigate(['/home']);
    //       this.messageNotificator.notifyForMessage({
    //         text: 'Successfully created post!',
    //         type: 'success',
    //       });
    //     },
    //     error: (err) => {
    //       // this.errorMessage = err.error.message;
    //       console.log("error:",err.error.message);
          
    //     },
    //   });

    // console.log("result",result);
  }
}
