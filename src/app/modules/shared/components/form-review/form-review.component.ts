import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlacesService } from '../../../../services';
import { IPlaceReview } from '../../../../static/type';


@Component({
  selector: 'app-form-review',
  templateUrl: './form-review.component.html',
  styleUrls: ['./form-review.component.css']
})
export class FormReviewComponent implements OnInit {

  constructor(private placesService: PlacesService) { }

  public rating: number = 0;
  public starCount: number = 5;
  public color: string = 'primary';

  public ratingTouched: boolean = false;
  public hasRatingError: boolean = false;

  public sentReview: boolean = false;

  public ratingArr: number[] = [];

  @Input() placeId: string;

  public formReview: FormGroup = new FormGroup({
    rating: new FormControl(null, [Validators.required]),
    comment: new FormControl(null, [Validators.required])
  });

  public setRating(rating: number): boolean {
    this.rating = rating;
    this.ratingTouched = true;
    this.hasRatingError = false;
    this.formReview.get('rating').setValue(rating);
    return false;
  }

  public getRatingIcon(index: number): string {
    if (this.rating >= index + 1) {
      return 'star';
    }
    return 'star_border';
  }

  public onSubmit(): void {
    this.hasRatingError = this.ratingTouched === false;
    if (this.formReview.invalid) { return; }
    const placeReview: IPlaceReview = {
      rating: this.formReview.get('rating').value,
      comment: this.formReview.get('comment').value
    };
    this.placesService.savePlaceReview(this.placeId, placeReview).subscribe(
      (data) => {
        this.resetForm();
        console.log('success', data);
      },
      (error) => {
        console.log('oops', error);
      }
    );
  }

  public resetForm(): void {
    this.formReview.reset();
    this.rating = 0;
    this.ratingTouched = false;
    this.hasRatingError = false;
    this.sentReview = true;
  }

  ngOnInit(): void {
    for (let index: number = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

}
