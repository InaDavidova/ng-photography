import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { MessageNotificatorService } from 'src/app/core/message-notificator.service';
import { IUser } from 'src/app/interfaces/userData';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  hide: boolean = true;
  hide2: boolean = true;
  errorMessage: string = '';
 
  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    if (group.get('password')?.value !== group.get('rePassword')?.value) {
      return {
        passwordMatch: true,
      };
    }
    return null;
  };

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    passwords: new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        rePassword: new FormControl(''),
      },
      { validators: this.checkPasswords }
    ),
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageNotificator: MessageNotificatorService,
  ) {
    this.registerFormGroup.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
  }

  handleRegister(): void {
    const { username, email, passwords } = this.registerFormGroup.value;

    const body: IUser = {
      username: username,
      email: email,
      password: passwords.password,
    };

    const result = this.authService.register$(body).subscribe({
      next: () => {
        this.router.navigate(['/home']);
        this.messageNotificator.notifyForMessage({text:'Successfully registered!', type:'success'});
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
    });

    console.log(result);
  }
}
