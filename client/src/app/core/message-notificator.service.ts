import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageNotificatorService {
  private messages$ = new Subject<{text:string, type:string}>();

  onNewMessage$ = this.messages$.asObservable();

  constructor() { }

  notifyForMessage(message:{text:string, type:string}){
    this.messages$.next(message);
  }

  clear(): void {
    this.messages$.next({text:"",type:""});
  }
}
