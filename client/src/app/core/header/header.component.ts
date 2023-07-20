import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IUser } from 'src/app/interfaces/userData';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  currentUser$: Observable<IUser|undefined> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  constructor(public authService: AuthService, private router: Router) {}

  logoutHandler(): void {
    this.authService.logout$().subscribe(()=>{
      this.router.navigate(['/home']);
    });
  }
}
