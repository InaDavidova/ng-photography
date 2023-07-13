import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoCardComponent } from './photo-card/photo-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [PhotoCardComponent],
  exports: [PhotoCardComponent],
  providers: [],
})
export class SharedModule {}
