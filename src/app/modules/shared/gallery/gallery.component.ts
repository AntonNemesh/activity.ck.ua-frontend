import { Component, Input, OnInit } from '@angular/core';
import { IPhotos } from '../../../static/type';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})


export class GalleryComponent implements OnInit {
  // @Input() photos: IPhotos[];

  public totalImages;
  public photos: IPhotos[];

  @Input('photos')
  set _photos(value) {
    if (value === undefined) { return; }
    this.photos = value;
  }

  constructor() {
  }

  public getTotalImages(): void {
    console.log(this.photos);
    console.log(this.totalImages);
  }


  ngOnInit(): void {
    // this.totalImages = this.photos.length;
    console.log(this.photos);
    // this.getTotalImages();
    console.log(this.totalImages);
  }
}
