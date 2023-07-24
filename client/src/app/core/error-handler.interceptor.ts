import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { MessageNotificatorService } from './message-notificator.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private messageNotificator: MessageNotificatorService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        this.messageNotificator.notifyForMessage({
          text:
            err.status === 0
              ? 'Please start the server :D'
              : err.error.message || 'Something went wrong!',
          type: 'error',
        });

        throw err;
      })
    );
  }
}
