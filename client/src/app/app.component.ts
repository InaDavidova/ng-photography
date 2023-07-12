import { Component } from '@angular/core';
import { data } from './storage/data';
import { IPhotoData } from './interfaces/photoData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Photography';
  data: IPhotoData[] = data;
}
