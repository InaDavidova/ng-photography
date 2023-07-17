import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatch } from '../util';
import { UserService } from 'src/app/core/user.service';
import { IUser } from 'src/app/interfaces/userData';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  hide: boolean = true;
  hide2: boolean = true;
  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }
  registerFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    passwords: new FormGroup({
      password: this.passwordControl,
      rePassword: new FormControl('', [passwordMatch(this.passwordControl)]),
    }),
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
  )
  {}

  handleRegister(): void {
    const { username, email, passwords} = this.registerFormGroup.value;
    
    const body: IUser = {
      username: username,
      email: email,
      password: passwords.password,
    }
    console.log(body);

   const result = this.userService.register$(body).subscribe(() => {
      this.router.navigate(['/home']);
    })

    console.log(result);
    
  }
}
