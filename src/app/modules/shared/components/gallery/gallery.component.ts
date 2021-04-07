import { Component, Input, OnInit } from '@angular/core';
import { IPhotos } from '../../../../static/type';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  @Input() photos: IPhotos[];
  ngOnInit(): void {}
}
