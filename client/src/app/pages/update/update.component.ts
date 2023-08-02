import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { MessageNotificatorService } from 'src/app/core/message-notificator.service';
import { PostService } from 'src/app/core/post.service';
import { IPost, IPostResponse } from 'src/app/interfaces/photoData';
import { IUser } from 'src/app/interfaces/userData';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  private imgBase64Path: string;
  currentUser: IUser | undefined;
  errorMessage: string = '';
  fileErrorMessage: string = '';
  post: IPost;
  isLoading: boolean;

  updateFormGroup: FormGroup;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private messageNotificator: MessageNotificatorService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    if(this.isLoading == false){

      this.updateFormGroup.valueChanges.subscribe(() => {
        this.errorMessage = '';
      });
      this.updateFormGroup.controls['image'].valueChanges.subscribe(() => {
        this.fileErrorMessage = '';
      });
    }
  }

  ngOnInit(): void {
    this.isLoading = true;
    const id = this.activatedRoute.snapshot.params['id'];

    this.postService.getPostById$(id).subscribe((post) => {
      this.post = post;

      this.updateFormGroup = this.formBuilder.group({
        title: new FormControl(post.title, [Validators.required]),
        description: new FormControl(post.description, [
          Validators.required,
          Validators.maxLength(250),
        ]),
        location: new FormControl(post.location, [Validators.required]),
        image: new FormControl(post.image, [Validators.required]),
      });

      this.imgBase64Path = post.image;
      
      this.isLoading = false;
    });

    this.authService.currentUser$.subscribe(
      (result) => (this.currentUser = result)
    );
  }

  onFileSelected(fileInput: any) {
    console.log(fileInput.target.files[0].size);

    if (fileInput.target.files[0].size > 52428800) {
      this.fileErrorMessage = 'Size can be maximum 50MB';
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = () => (this.imgBase64Path = e.target.result);
    };
    reader.readAsDataURL(fileInput.target.files[0]);
  }

  handleUpdatePost(): void {
    this.errorMessage = '';
    const { title, description, location } = this.updateFormGroup.value;

    const body = {
      title,
      description,
      location,
      image: this.imgBase64Path,
    };

    const result = this.postService.editPost$(body, this.post._id!).subscribe({
      next: () => {
        this.router.navigate([`/details/${this.post._id}`]);
        this.messageNotificator.notifyForMessage({
          text: 'Successfully updated post!',
          type: 'success',
        });
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
    });

    console.log(result);
  }
}
