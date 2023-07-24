import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { MessageNotificatorService } from 'src/app/core/message-notificator.service';
import { PostService } from 'src/app/core/post.service';
import { IPost } from 'src/app/interfaces/photoData';
import { IUser } from 'src/app/interfaces/userData';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  private imgBase64Path: string;
  currentUser: IUser | undefined;
  errorMessage: string = '';
  fileErrorMessage: string = '';

  createFormGroup: FormGroup = this.formBuilder.group({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(250),
    ]),
    location: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private messageNotificator: MessageNotificatorService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.createFormGroup.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
    this.createFormGroup.controls['image'].valueChanges.subscribe(() => {
      this.fileErrorMessage = '';
    });
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(
      (result) => (this.currentUser = result)
    );
  }

  onFileSelected(fileInput: any) {
    console.log(fileInput.target.files[0].size);
    
    if (fileInput.target.files[0].size >  52428800) {
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

  handleCreatePost(): void {
    this.errorMessage = '';
    const { title, description, location } = this.createFormGroup.value;

    const body: IPost = {
      title,
      description,
      location,
      image: this.imgBase64Path,
      owner: this.currentUser!._id || '',
    };

    const result = this.postService.addPost$(body).subscribe({
      next: () => 
      {
        this.router.navigate(['/catalog']);
        this.messageNotificator.notifyForMessage({
          text: 'Successfully created post!',
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
