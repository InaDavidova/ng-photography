import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';

@NgModule({
  imports: [CommonModule, AppRoutingModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent, HttpClientModule],
  providers: [],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterceptor },
        { provide: HTTP_INTERCEPTORS, multi: true, useClass: ErrorHandlerInterceptor },
        //all services from this module
      ],
    };
  }
}
