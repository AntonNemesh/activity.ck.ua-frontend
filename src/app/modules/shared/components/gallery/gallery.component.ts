import { Component, Input, OnInit } from '@angular/core';
import { IPhotos } from '../../../../static/type';
import {interval, Observable} from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  public selectedPhotoIndex: number = 0;
  public interval: Observable<number> = interval(3000);

  @Input()
  photos: IPhotos[];

  public subscription: any = () => this.interval.subscribe(() => {
    ++this.selectedPhotoIndex;
    if (this.selectedPhotoIndex === this.photos.length) {
      this.selectedPhotoIndex = 0;
    }
  })

  public getCurrentPhoto(index: number): void {
    this.subscription().unsubscribe();
    this.selectedPhotoIndex = index;
    this.subscription();
  }

  public checkState(id: number): boolean {
    let result: boolean = false;
    if (this.selectedPhotoIndex === id) { result = true; }
    return result;
  }

  ngOnInit(): void {
    this.subscription();
  }

}
