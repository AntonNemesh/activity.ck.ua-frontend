import { Component, Input, OnInit } from '@angular/core';
import { IPhotos } from '../../../../static/type';
import {MatCarousel, MatCarouselComponent} from '@ngmodule/material-carousel';
import {interval, Observable} from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  @Input()
  photos: IPhotos[];

  ngOnInit()
    :
    void {}

}
