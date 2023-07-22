import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/interfaces/photoData';
import { data } from 'src/app/storage/data';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  data!: IPost[];
  isLoading!: boolean;

  ngOnInit(): void {
    this.isLoading = true;

    // a request for data here
    setTimeout(() => {
      this.data = data;
      this.isLoading = false;
    },1000);

  }
}
