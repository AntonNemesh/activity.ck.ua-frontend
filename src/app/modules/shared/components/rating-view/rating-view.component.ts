import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-view',
  templateUrl: './rating-view.component.html',
  styleUrls: ['./rating-view.component.css']
})
export class RatingViewComponent implements OnInit {

  constructor() { }

  public starCount: number = 5;
  public color: string = 'primary';

  public ratingArr: number[] = [];

  @Input() placeId: string;
  @Input() rating: number;
  @Input() numberOfReview: number;

  public initRatingView(): void {
    for (let index: number = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  public getRatingIcon(index: number): string {
    if (this.rating >= index + 1) { return 'star'; }
    if (Math.floor(this.rating) === index &&
        Math.floor(this.rating) !== Math.round(this.rating)) { return 'star_half'; }
    return 'star_border';
  }

  ngOnInit(): void {
    this.initRatingView();
  }
}
