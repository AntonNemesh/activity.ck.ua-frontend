import { Component, Input, OnInit } from '@angular/core';
import { IPhotos } from '../../../../static/type';
import { PlacesService } from '../../../../services';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  constructor(private placesService: PlacesService) { }

  @Input()
  photos: IPhotos[];

  ngOnInit(): void {
    console.log(this.photos.length);
  }
}
