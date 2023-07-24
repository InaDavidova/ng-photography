import { Component, Input } from '@angular/core';
import { IPostResponse } from '../../interfaces/photoData';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.css'],
})
export class PhotoCardComponent {
  @Input('photoData') data!: IPostResponse;
}
