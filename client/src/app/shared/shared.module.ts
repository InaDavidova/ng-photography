import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoCardComponent } from './photo-card/photo-card.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [CommonModule,AppRoutingModule],
  declarations: [PhotoCardComponent],
  exports: [PhotoCardComponent],
  providers: [],
})
export class SharedModule {}
