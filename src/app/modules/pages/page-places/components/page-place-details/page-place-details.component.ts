import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService, DateService, EventsService, PlacesService, UsersService } from '../../../../../services';
import { IEvent, IPlace, IPlaceReview } from '../../../../../static/type';


@Component({
  selector: 'app-page-place-details',
  templateUrl: './page-place-details.component.html',
  styleUrls: ['./page-place-details.component.css']
})
export class PagePlaceDetailsComponent implements OnInit {
  public placeId: string;
  public place: IPlace;

  public events: IEvent[];

  public visited: boolean;
  public favorite: boolean;

  public reviews: IPlaceReview[] = [];
  public reviewsPage: number = 1;
  public reviewsLimit: number = 3;
  public reviewsTotal: number;
  public reviewsTotalPages: number;
  public reviewsState: boolean = false;

  public isLoggedIn: boolean = this.authorizationService.isLoggedIn;

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private eventsService: EventsService,
    private usersService: UsersService,
    private authorizationService: AuthorizationService,
    public dateService: DateService) { }

  private eventsPage: number = 1;
  private eventsLimit: number = 1;

  public getPlace(): void {
    this.placesService.getPlaceById(this.placeId).subscribe((place) => {
      this.place = place;
      this.favorite = place.favorite;
      this.visited = place.visited;
    });
  }

  public getEvents(): void {
    this.eventsService.getEventsByPlaceId(this.placeId, this.eventsPage, this.eventsLimit).subscribe((data) => {
      this.events = data.events;
    });
  }

  public updateFavoriteState(): void {
    this.placesService.getPlaceById(this.placeId).subscribe((place) => {
      this.favorite = place.favorite;
      if (this.favorite) {
        this.usersService.removePlaceFromFavorite(this.placeId).subscribe();
        this.favorite = !this.favorite;
        return;
      }
      this.usersService.addPlaceToFavorite(this.placeId).subscribe();
      this.favorite = !this.favorite;
    });
  }

  public updateVisitedState(): void {
    this.placesService.getPlaceById(this.placeId).subscribe((place) => {
      this.visited = place.visited;
      if (this.visited) {
        this.usersService.removePlaceFromVisited(this.placeId).subscribe();
        this.visited = !this.visited;
        return;
      }
      this.usersService.addPlaceToVisited(this.placeId).subscribe();
      this.visited = !this.visited;
    });
  }

  public updateReviewsPaginationState([page, isConcatenation]: [number, boolean]): void {
    this.reviewsPage = page;
    this.updateReviews(isConcatenation);
  }

  public updateReviewsState(): void {
    this.getPlace();
    this.reviewsPage = 1;
    this.updateReviews();
    this.reviewsState = !this.reviewsState;
  }

  public updateReviews(isConcatenation?: boolean): void {
    this.placesService.getReviewsByPlaceId(this.placeId, this.reviewsPage, this.reviewsLimit).subscribe((data) => {
      this.reviewsTotalPages = data._totalPages;
      this.reviewsTotal = data._total;
      if (isConcatenation) {
        this.reviews = this.reviews.concat(data.reviews);
        return;
      }
      if (this.reviews?.length) { this.reviews.length = 0; }
      this.reviews = data.reviews;
    });
  }

  public getFitterState(state: boolean): string {
    if (state === true) {
      return `<span class="green"> так</span>`;
    }
    if (state === false) {
      return `<span class="red"> ні</span>`;
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.placeId = params.place_id;
    });
    this.getPlace();
    this.getEvents();
    this.updateReviews();
  }
}
