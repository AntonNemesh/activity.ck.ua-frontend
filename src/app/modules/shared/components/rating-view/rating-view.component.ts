import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating-view',
  templateUrl: './rating-view.component.html',
  styleUrls: ['./rating-view.component.css']
})
export class RatingViewComponent implements OnInit {
  constructor() { }

  @Input() placeId: string;
  @Input() rating: number;
  @Input() reviewsTotal: number;

  ngOnInit(): void {}
}
