import { Component, Input, OnInit } from '@angular/core';
import {DateService, PlacesService} from '../../../../services';
import { IPlaceReview } from '../../../../static/type';

@Component({
  selector: 'app-comments-view',
  templateUrl: './comments-view.component.html',
  styleUrls: ['./comments-view.component.css']
})
export class CommentsViewComponent implements OnInit {
  constructor(private placesService: PlacesService, public dateService: DateService) { }

  public reviews: IPlaceReview[] = [];
  public totalPages: number = 3;
  public page: number = 1;
  public limit: number = 3;

  @Input() placeId: string;

  public updateReviews(isConcatenation?: boolean): void {
    this.placesService.getReviewsByPlaceId(this.placeId, this.page, this.limit).subscribe((data) => {
      if (isConcatenation) {
        this.reviews = this.reviews.concat(data);
        return;
      }
      if (this.reviews?.length) { this.reviews.length = 0; }
      this.reviews = data;
    });
  }

  public updatePaginationState([page, isConcatenation]: [number, boolean]): void {
    this.page = page;
    this.updateReviews(isConcatenation);
  }

  ngOnInit(): void {
    this.updateReviews();
  }
}
