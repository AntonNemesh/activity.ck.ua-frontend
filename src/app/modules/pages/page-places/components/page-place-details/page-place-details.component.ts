import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateService, EventsService, PlacesService, UsersService } from '../../../../../services';
import { IEvent, IPlace } from '../../../../../static/type';


@Component({
  selector: 'app-page-place-details',
  templateUrl: './page-place-details.component.html',
  styleUrls: ['./page-place-details.component.css']
})
export class PagePlaceDetailsComponent implements OnInit {
  public placeId: string;
  public place: IPlace;
  public user: any;
  public events: IEvent[];
  public visited: boolean;
  public favorite: boolean;

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private eventsService: EventsService,
    private usersService: UsersService,
    public dateService: DateService) { }

  private page: number = 1;
  private limit: number = 4;

  public getPlace(): void {
    this.placesService.getPlaceById(this.placeId).subscribe((place) => {
      this.place = place;
      this.favorite = place.favorite;
      this.visited = place.visited;
    });
    this.eventsService.getEventsByPlaceId(this.placeId, this.page, this.limit).subscribe((data) => {
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

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.placeId = params.place_id;
    });
    this.route.data.subscribe((data) => {
      this.user = data.user;
    });
    this.getPlace();
  }
}
