import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/post.service';
import { IPostResponse } from 'src/app/interfaces/photoData';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  data!: IPostResponse[];
  isLoading!: boolean;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.postService.getPosts$().subscribe((postList) => {
      this.data = postList;
      this.isLoading = false;
    });
  }
}
