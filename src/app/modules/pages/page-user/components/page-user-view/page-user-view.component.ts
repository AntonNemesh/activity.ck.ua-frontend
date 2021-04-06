import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../../services';
import { IObjectActivity } from '../../../../../static/type/user.interface';

@Component({
  selector: 'app-page-user-view',
  templateUrl: './page-user-view.component.html',
  styleUrls: ['./page-user-view.component.css']
})
export class PageUserViewComponent implements OnInit {

  constructor(private userService: UsersService) { }

  public visitedPlaces: IObjectActivity[];
  public favoritePlaces: IObjectActivity[];
  public userPlaces: IObjectActivity[];
  public userEvents: IObjectActivity[];
  public scheduledEvents: IObjectActivity[];

  public visitedPlacesPage: number = 1;
  public favoritePlacesPage: number = 1;
  public userPlacesPage: number = 1;
  public userEventsPage: number = 1;
  public scheduledEventsPage: number = 1;

  public visitedPlacesTotalPages: number = 5;
  public favoritePlacesTotalPages: number = 5;
  public userPlacesTotalPages: number = 5;
  public userEventsTotalPages: number = 5;
  public scheduledEventsTotalPages: number = 5;

  public limit: number = 1;

  public updateEvents(section: string): void {
    if (section === 'all') {
      this.userService.getUserActivity(1, this.limit).subscribe(
        (userActivity) => {
        this.visitedPlaces = userActivity.visited_places;
        this.favoritePlaces = userActivity.favorite_places;
        this.userPlaces = userActivity.user_places;
        this.userEvents = userActivity.user_events;
        this.scheduledEvents = userActivity.scheduled_events;
      });
    }
    if (section === 'visited places') {
      this.userService.getVisitedPlaces(this.visitedPlacesPage, this.limit).subscribe(
        (visitedPlaces) => { this.visitedPlaces = visitedPlaces; });
    }
    if (section === 'favorite places') {
      this.userService.getFavoritePlaces(this.favoritePlacesPage, this.limit).subscribe(
        (favoritePlaces) => { this.favoritePlaces = favoritePlaces; });
    }
    if (section === 'user places') {
      this.userService.getUserPlaces(this.userPlacesPage, this.limit).subscribe(
        (userPlaces) => { this.userPlaces = userPlaces; });
    }
    if (section === 'user events') {
      this.userService.getUserEvents(this.userEventsPage, this.limit).subscribe(
        (userEvents) => { this.userEvents = userEvents; });
    }
    if (section === 'scheduled events') {
      this.userService.getScheduledEvents(this.scheduledEventsPage, this.limit).subscribe(
        (scheduledEvents) => { this.scheduledEvents = scheduledEvents; });
    }
  }

  public updateVisitedPlacesPaginationState([page, isConcatenation]: [number, boolean]): void {
    this.visitedPlacesPage = page;
    this.updateEvents('visited places');
  }

  public updateFavoritePlacesPaginationState([page, isConcatenation]: [number, boolean]): void {
    this.favoritePlacesPage = page;
    this.updateEvents('favorite places');
  }

  public updateUserPlacesPaginationState([page, isConcatenation]: [number, boolean]): void {
    this.userPlacesPage = page;
    this.updateEvents('user places');
  }

  public updateUserEventsPaginationState([page, isConcatenation]: [number, boolean]): void {
    this.userEventsPage = page;
    this.updateEvents('user events');
  }

  public updateScheduledEventsPaginationState([page, isConcatenation]: [number, boolean]): void {
    this.scheduledEventsPage = page;
    this.updateEvents('scheduled events');
  }

  ngOnInit(): void {
    this.updateEvents('all');
  }
}
