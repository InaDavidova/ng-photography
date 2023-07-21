import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IUser } from 'src/app/interfaces/userData';
import { MessageNotificatorService } from '../message-notificator.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUser$: Observable<IUser|undefined> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  message: string;
  isErrorMessage:boolean;

  private subscription: Subscription;

  constructor(public authService: AuthService, private router: Router, private messageNotificator: MessageNotificatorService) {}

  logoutHandler(): void {
    this.authService.logout$().subscribe(()=>{
      this.router.navigate(['/home']);
    });
  }

  ngOnInit(): void {
    this.subscription = this.messageNotificator.onNewMessage$.subscribe(newMessage=>{
      this.message = newMessage.text || "";
      this.isErrorMessage = newMessage.type === "error";
      
      if (this.message) {
        setTimeout(() => {
          this.messageNotificator.clear();
        }, 2500);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
