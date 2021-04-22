import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-stars-bar',
  templateUrl: './rating-stars-bar.component.html',
  styleUrls: ['./rating-stars-bar.component.css']
})
export class RatingStarsBarComponent implements OnInit {
  constructor() { }

  public starCount: number = 5;

  public ratingArr: number[] = [];
  public styles: string;

  @Input() rating: number;
  @Input() color: string = 'primary';
  @Input('size') set size(value: number) {
    if (!value) { value = 36; }
    this.styles = `height:${value}px;width:${value}px;font-size:${value}px`;
  }

  public initRatingStarsBar(): void {
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
    this.initRatingStarsBar();
  }
}
