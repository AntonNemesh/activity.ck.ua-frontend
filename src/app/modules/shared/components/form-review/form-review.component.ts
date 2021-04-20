import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlacesService } from '../../../../services';
import { IPlaceReview, IUser } from '../../../../static/type';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-form-review',
  templateUrl: './form-review.component.html',
  styleUrls: ['./form-review.component.css']
})
export class FormReviewComponent implements OnInit {

  constructor(
    private placesService: PlacesService,
    private route: ActivatedRoute,
    private matSnackBar: MatSnackBar
  ) { }

  public user: IUser;

  public rating: number = 0;
  public starCount: number = 5;
  public color: string = 'primary';

  public ratingTouched: boolean = false;
  public hasRatingError: boolean = false;

  public ratingArr: number[] = [];

  @Input() placeId: string;

  public formReview: FormGroup = new FormGroup({
    rating: new FormControl(null, Validators.required),
    comment: new FormControl(null)
  });

  public setRating(rating: number): boolean {
    this.rating = rating;
    this.ratingTouched = true;
    this.hasRatingError = false;
    this.formReview.get('rating').setValue(rating);
    return false;
  }

  public initRatingView(): void {
    for (let index: number = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
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
    let comment: string|null = this.formReview.get('comment').value;
    comment = (typeof comment === 'string') ? comment.trim() : comment;
    const placeReview: IPlaceReview = {
      rating: this.formReview.get('rating').value,
      comment: (comment === '') ? null : comment,
    };
    this.placesService.savePlaceReview(this.placeId, placeReview).subscribe(
      (data) => {
        this.resetForm();
        this.matSnackBar.open('Ви залишили відгук!', '', { duration: 2000 });
        console.log('success', data);
      },
      (error) => {
        this.matSnackBar.open('Відгук не був залишений через збій із сервером.', '', { duration: 2000, });
        console.log('oops', error);
      }
    );
  }

  public resetForm(): void {
    this.formReview.reset();
    this.rating = 0;
    this.ratingTouched = false;
    this.hasRatingError = false;

  }

  ngOnInit(): void {
    this.initRatingView();
    this.route.data.subscribe((data) => {
      this.user = data.user;
    });
  }

}
