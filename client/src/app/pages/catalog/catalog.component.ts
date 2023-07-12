import { Component } from '@angular/core';
import { IPhotoData } from 'src/app/interfaces/photoData';
import { data } from 'src/app/storage/data';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  data: IPhotoData[] = data;
}
