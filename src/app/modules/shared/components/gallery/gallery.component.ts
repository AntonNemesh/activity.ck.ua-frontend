import {Component, Input, OnInit} from '@angular/core';
import {IPhotos} from '../../../../static/type';
import {interval} from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  public totalImages: number;
  public selectedDot: number;
  public selectedPhoto: IPhotos;
  public interval: any = interval(5000);

  constructor() {
  }

  @Input()
  photos: IPhotos[];

  public getPhoto(index: number): void {
    this.selectedPhoto = this.photos[index];
  }

  public getCurrentPhoto(event: Event, index: number): void {
    this.selectedDot = index;
    this.getPhoto(this.selectedDot);
  }

  public getNextPhoto(): void {

  }

  public rotatePhotos(index: number): void {
    this.selectedPhoto = this.photos[index];
    this.photos.forEach(item => {
      this.interval.subscribe(this.selectedPhoto = item, console.log('interval', this.selectedPhoto));
    });
  }

  ngOnInit(): void {
    this.totalImages = this.photos.length;
    this.rotatePhotos(0);
  }

}
